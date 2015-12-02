///<reference path='references.ts' />

module TypeScript {
    export interface ISyntaxToken extends ISyntaxNodeOrToken, INameSyntax, IPrimaryExpressionSyntax, IPropertyAssignmentSyntax, IPropertyNameSyntax {
        // Adjusts the full start of this token.  Should only be called by the parser.
        setFullStart(fullStart: number): void;

        // The absolute start of this element, including the leading trivia.
        fullStart(): number;

        // With of this element, including leading and trailing trivia.
        fullWidth(): number;

        // Text for this token, not including leading or trailing trivia.
        text(): string;
        fullText(text?: ISimpleText): string;

        hasLeadingTrivia(): boolean;
        hasLeadingNewLine(): boolean;
        hasLeadingComment(): boolean;
        hasLeadingSkippedToken(): boolean;

        leadingTrivia(text?: ISimpleText): ISyntaxTriviaList;
        leadingTriviaWidth(text?: ISimpleText): number;

        // True if this was a keyword that the parser converted to an identifier.  i.e. if you have
        //      x.public
        //
        // then 'public' will be converted to an identifier.  These tokens should are parser 
        // generated and, as such, should not be returned when the incremental parser source
        // hands out tokens.  Note: If it is included in a node then *that* node may still
        // be reusuable.  i.e. if i have:  private Foo() { x.public = 1; }
        //
        // Then that entire method node is reusable even if the 'public' identifier is not.
        isKeywordConvertedToIdentifier(): boolean;

        // True if this element cannot be reused in incremental parsing.  There are several situations
        // in which an element can not be reused.  They are:
        //
        // 1) The element contained skipped text.
        // 2) The element contained zero width tokens.
        // 3) The element contains tokens generated by the parser (like >> or a keyword -> identifier
        //    conversion).
        // 4) The element contains a regex token somewhere under it.  A regex token is either a 
        //    regex itself (i.e. /foo/), or is a token which could start a regex (i.e. "/" or "/=").  This
        //    data is used by the incremental parser to decide if a node can be reused.  Due to the 
        //    lookahead nature of regex tokens, a node containing a regex token cannot be reused.  Normally,
        //    changes to text only affect the tokens directly intersected.  However, because regex tokens 
        //    have such unbounded lookahead (technically bounded at the end of a line, but htat's minor), 
        //    we need to recheck them to see if they've changed due to the edit.  For example, if you had:
        //    
        //         while (true) /3; return;
        //    
        //    And you changed it to:
        //    
        //         while (true) /3; return/;
        //    
        //    Then even though only the 'return' and ';' colons were touched, we'd want to rescan the '/'
        //    token which we would then realize was a regex.
        isIncrementallyUnusable(): boolean;

        clone(): ISyntaxToken;
    }
}

module TypeScript {
    export function tokenValue(token: ISyntaxToken): any {
        if (token.fullWidth() === 0) {
            return undefined;
        }

        var kind = token.kind;
        var text = token.text();

        if (kind === SyntaxKind.IdentifierName) {
            return massageEscapes(text);
        }

        switch (kind) {
            case SyntaxKind.TrueKeyword:
                return true;
            case SyntaxKind.FalseKeyword:
                return false;
            case SyntaxKind.NullKeyword:
                return undefined;
        }

        if (SyntaxFacts.isAnyKeyword(kind) || SyntaxFacts.isAnyPunctuation(kind)) {
            return SyntaxFacts.getText(kind);
        }

        if (kind === SyntaxKind.NumericLiteral) {
            return IntegerUtilities.isHexInteger(text) ? parseInt(text, /*radix:*/ 16) : parseFloat(text);
        }
        else if (kind === SyntaxKind.StringLiteral) {
            return (text.length > 1 && text.charCodeAt(text.length - 1) === text.charCodeAt(0)) 
                ? massageEscapes(text.substr(1, text.length - "''".length))
                : massageEscapes(text.substr(1));
        }
        else if (kind === SyntaxKind.NoSubstitutionTemplateToken || kind === SyntaxKind.TemplateEndToken) {
            // Both of these template types may be missing their closing backtick (if they were at 
            // the end of the file).  Check to make sure it is there before grabbing the portion
            // we're examining.
            return (text.length > 1 && text.charCodeAt(text.length - 1) === CharacterCodes.backtick) 
                ? massageTemplate(text.substr(1, text.length - "``".length))
                : massageTemplate(text.substr(1));
        }
        else if (kind === SyntaxKind.TemplateStartToken || kind === SyntaxKind.TemplateMiddleToken) {
            // Both these tokens must have been properly ended.  i.e. if it didn't end with a ${
            // then we would not have parsed a start or middle token out at all.  So we don't
            // need to check for an incomplete token.
            return massageTemplate(text.substr(1, text.length - "`${".length));
        }
        else if (kind === SyntaxKind.RegularExpressionLiteral) {
            return regularExpressionValue(text);
        }
        else if (kind === SyntaxKind.EndOfFileToken || kind === SyntaxKind.ErrorToken) {
            return undefined;
        }
        else {
            throw Errors.invalidOperation();
        }
    }

    export function tokenValueText(token: ISyntaxToken): string {
        var value = tokenValue(token);
        return value === undefined ? "" : massageDisallowedIdentifiers(value.toString());
    }

    function massageTemplate(text: string): string {
        // First, convert all carriage-return newlines into line-feed newlines.  This is due to:
        //
        // The TRV of LineTerminatorSequence :: <CR> is the code unit value 0x000A.
        // ...
        // The TRV of LineTerminatorSequence :: <CR><LF> is the sequence consisting of the code unit value 0x000A.
        text = text.replace("\r\n", "\n").replace("\r", "\n");

        // Now remove any escape characters that may be in the string.
        return massageEscapes(text);
    }

    export function massageEscapes(text: string): string {
        return text.indexOf("\\") >= 0 ? convertEscapes(text) : text;
    }

    function regularExpressionValue(text: string): RegExp {
        try {
            var lastSlash = text.lastIndexOf("/");
            var body = text.substring(1, lastSlash);
            var flags = text.substring(lastSlash + 1);
            return new RegExp(body, flags);
        }
        catch (e) {
            return undefined;
        }
    }

    function massageDisallowedIdentifiers(text: string): string {
        // We routinely store the 'valueText' for a token as keys in dictionaries.  However, as those
        // dictionaries are usually just a javascript object, we run into issues when teh keys collide
        // with certain predefined keys they depend on (like __proto__).  To workaround this
        // we ensure that the valueText of any token is not __proto__ but is instead ___proto__.
        //
        // We also prepend a _ to any identifier starting with two __ .  That allows us to carve 
        // out the entire namespace of identifiers starting with __ for ourselves.
        if (text.charCodeAt(0) === CharacterCodes._ && text.charCodeAt(1) === CharacterCodes._) {
            return "_" + text;
        }

        return text;
    }

    var characterArray: number[] = [];

    function convertEscapes(text: string): string {
        characterArray.length = 0;
        var result = "";

        for (var i = 0, n = text.length; i < n; i++) {
            var ch = text.charCodeAt(i);

            if (ch === CharacterCodes.backslash) {
                i++;
                if (i < n) {
                    ch = text.charCodeAt(i);
                    switch (ch) {
                        case CharacterCodes._0:
                            characterArray.push(CharacterCodes.nullCharacter);
                            continue;

                        case CharacterCodes.b:
                            characterArray.push(CharacterCodes.backspace);
                            continue;

                        case CharacterCodes.f:
                            characterArray.push(CharacterCodes.formFeed);
                            continue;

                        case CharacterCodes.n:
                            characterArray.push(CharacterCodes.lineFeed);
                            continue;

                        case CharacterCodes.r:
                            characterArray.push(CharacterCodes.carriageReturn);
                            continue;

                        case CharacterCodes.t:
                            characterArray.push(CharacterCodes.tab);
                            continue;

                        case CharacterCodes.v:
                            characterArray.push(CharacterCodes.verticalTab);
                            continue;

                        case CharacterCodes.x:
                            characterArray.push(hexValue(text, /*start:*/ i + 1, /*length:*/ 2));
                            i += 2;
                            continue;

                        case CharacterCodes.u:
                            characterArray.push(hexValue(text, /*start:*/ i + 1, /*length:*/ 4));
                            i += 4;
                            continue;

                        case CharacterCodes.carriageReturn:
                            var nextIndex = i + 1;
                            if (nextIndex < text.length && text.charCodeAt(nextIndex) === CharacterCodes.lineFeed) {
                                // Skip the entire \r\n sequence.
                                i++;
                            }
                            continue;

                        case CharacterCodes.lineFeed:
                        case CharacterCodes.paragraphSeparator:
                        case CharacterCodes.lineSeparator:
                            // From ES5: LineContinuation is the empty character sequence.
                            continue;

                        default:
                        // Any other character is ok as well.  As per rule:
                        // EscapeSequence :: CharacterEscapeSequence
                        // CharacterEscapeSequence :: NonEscapeCharacter
                        // NonEscapeCharacter :: SourceCharacter but notEscapeCharacter or LineTerminator
                        //
                        // Intentional fall through
                    }
                }
            }

            characterArray.push(ch);

            if (i && !(i % 1024)) {
                result = result.concat(String.fromCharCode.apply(undefined, characterArray));
                characterArray.length = 0;
            }
        }

        if (characterArray.length) {
            result = result.concat(String.fromCharCode.apply(undefined, characterArray));
        }

        return result;
    }

    function hexValue(text: string, start: number, length: number): number {
        var intChar = 0;
        for (var i = 0; i < length; i++) {
            var ch2 = text.charCodeAt(start + i);
            if (!CharacterInfo.isHexDigit(ch2)) {
                break;
            }

            intChar = (intChar << 4) + CharacterInfo.hexValue(ch2);
        }

        return intChar;
    }
}

module TypeScript.Syntax {
    export function realizeToken(token: ISyntaxToken, text: ISimpleText): ISyntaxToken {
        return new RealizedToken(token.fullStart(), token.kind, token.isKeywordConvertedToIdentifier(), token.leadingTrivia(text), token.text());
    }

    export function convertKeywordToIdentifier(token: ISyntaxToken): ISyntaxToken {
        return new ConvertedKeywordToken(token);
    }

    export function withLeadingTrivia(token: ISyntaxToken, leadingTrivia: ISyntaxTriviaList, text: ISimpleText): ISyntaxToken {
        return new RealizedToken(token.fullStart(), token.kind, token.isKeywordConvertedToIdentifier(), leadingTrivia, token.text());
    }

    export function emptyToken(kind: SyntaxKind, fullStart: number): ISyntaxToken {
        return new EmptyToken(kind, fullStart);
    }

    class EmptyToken implements ISyntaxToken {
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _typeBrand: any; public _nameBrand: any; public _propertyAssignmentBrand: any; public _propertyNameBrand: any;

        public parent: ISyntaxElement;
        public childCount: number;

        constructor(public kind: SyntaxKind, private _fullStart: number) {
            Debug.assert(!isNaN(_fullStart));
        }

        public setFullStart(fullStart: number): void {
            this._fullStart = fullStart;
        }

        public childAt(index: number): ISyntaxElement { throw Errors.invalidOperation() }

        public clone(): ISyntaxToken {
            return new EmptyToken(this.kind, this._fullStart);
        }

        // Empty tokens are never incrementally reusable.
        public isIncrementallyUnusable() { return true; }

        public isKeywordConvertedToIdentifier() {
            return false;
        }

        public fullWidth() { return 0; }
        public fullStart(): number { return this._fullStart; }

        public text() { return ""; }
        public fullText(): string { return ""; }

        public hasLeadingTrivia() { return false; }
        public hasLeadingNewLine() { return false; }
        public hasLeadingComment() { return false; }
        public hasLeadingSkippedToken() { return false; }

        public leadingTriviaWidth() { return 0; }
        public leadingTrivia(): ISyntaxTriviaList { return Syntax.emptyTriviaList; }
    }
    EmptyToken.prototype.childCount = 0;

    class RealizedToken implements ISyntaxToken {
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _typeBrand: any; public _nameBrand: any; public _propertyAssignmentBrand: any; public _propertyNameBrand: any;

        private _isKeywordConvertedToIdentifier: boolean;
        private _leadingTrivia: ISyntaxTriviaList;
        private _text: string;

        public parent: ISyntaxElement;
        public childCount: number;

        constructor(private _fullStart: number,
                    public kind: SyntaxKind,
                    isKeywordConvertedToIdentifier: boolean,
                    leadingTrivia: ISyntaxTriviaList,
                    text: string) {
            Debug.assert(!isNaN(_fullStart));
            this._isKeywordConvertedToIdentifier = isKeywordConvertedToIdentifier;
            this._text = text;

            this._leadingTrivia = leadingTrivia.clone();

            if (!this._leadingTrivia.isShared()) {
                this._leadingTrivia.parent = this;
            }
        }

        public setFullStart(fullStart: number): void {
            this._fullStart = fullStart;
        }

        public childAt(index: number): ISyntaxElement { throw Errors.invalidOperation() }

        public clone(): ISyntaxToken {
            return new RealizedToken(this._fullStart, this.kind, this._isKeywordConvertedToIdentifier, this._leadingTrivia, this._text);
        }

        // Realized tokens are created from the parser.  They are *never* incrementally reusable.
        public isIncrementallyUnusable() { return true; }

        public isKeywordConvertedToIdentifier() {
            return this._isKeywordConvertedToIdentifier;
        }

        public fullStart(): number { return this._fullStart; }
        public fullWidth(): number { return this._leadingTrivia.fullWidth() + this._text.length; }

        public text(): string { return this._text; }
        public fullText(): string { return this._leadingTrivia.fullText() + this.text(); }

        public hasLeadingTrivia(): boolean { return this._leadingTrivia.count() > 0; }
        public hasLeadingNewLine(): boolean { return this._leadingTrivia.hasNewLine(); }
        public hasLeadingComment(): boolean { return this._leadingTrivia.hasComment(); }
        public hasLeadingSkippedToken(): boolean { return this._leadingTrivia.hasSkippedToken(); }

        public leadingTrivia(): ISyntaxTriviaList { return this._leadingTrivia; }
        public leadingTriviaWidth(): number { return this._leadingTrivia.fullWidth(); }
    }
    RealizedToken.prototype.childCount = 0;

    class ConvertedKeywordToken implements ISyntaxToken {
        public _primaryExpressionBrand: any; public _memberExpressionBrand: any; public _leftHandSideExpressionBrand: any; public _postfixExpressionBrand: any; public _unaryExpressionBrand: any; public _expressionBrand: any; public _typeBrand: any; public _nameBrand: any; public _propertyAssignmentBrand: any; public _propertyNameBrand: any;

        public parent: ISyntaxElement;
        public kind: SyntaxKind;
        public childCount: number;

        constructor(private underlyingToken: ISyntaxToken) {
        }

        public setFullStart(fullStart: number): void {
            this.underlyingToken.setFullStart(fullStart);
        }

        public childAt(index: number): ISyntaxElement { throw Errors.invalidOperation() }

        public fullStart(): number {
            return this.underlyingToken.fullStart();
        }

        public fullWidth(): number {
            return this.underlyingToken.fullWidth();
        }

        public text(): string {
            return this.underlyingToken.text();
        }

        private syntaxTreeText(text: ISimpleText) {
            var result = text || syntaxTree(this).text;
            Debug.assert(result);
            return result;
        }

        public fullText(text?: ISimpleText): string {
            return this.underlyingToken.fullText(this.syntaxTreeText(text));
        }

        public hasLeadingTrivia(): boolean { return this.underlyingToken.hasLeadingTrivia(); }
        public hasLeadingNewLine(): boolean { return this.underlyingToken.hasLeadingNewLine(); }
        public hasLeadingComment(): boolean { return this.underlyingToken.hasLeadingComment(); }
        public hasLeadingSkippedToken(): boolean { return this.underlyingToken.hasLeadingSkippedToken(); }

        public leadingTrivia(text?: ISimpleText): ISyntaxTriviaList {
            var result = this.underlyingToken.leadingTrivia(this.syntaxTreeText(text));
            result.parent = this;
            return result;
        }

        public leadingTriviaWidth(text?: ISimpleText): number {
            return this.underlyingToken.leadingTriviaWidth(this.syntaxTreeText(text));
        }

        public isKeywordConvertedToIdentifier(): boolean {
            return true;
        }

        public isIncrementallyUnusable(): boolean {
            // We're incrementally unusable if our underlying token is unusable.
            // For example, we may have: this.public \
            // In this case we will keyword converted to an identifier that is still unusable because
            // it has a trailing skipped token.
            return this.underlyingToken.isIncrementallyUnusable();
        }

        public clone(): ISyntaxToken {
            return new ConvertedKeywordToken(this.underlyingToken);
        }
    }
    ConvertedKeywordToken.prototype.kind = SyntaxKind.IdentifierName;
    ConvertedKeywordToken.prototype.childCount = 0;
}