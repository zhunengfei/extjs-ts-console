///<reference path='references.ts' />

module TypeScript {
    export function visitNodeOrToken(visitor: ISyntaxVisitor, element: ISyntaxNodeOrToken): any {
        if (element === undefined) { return undefined; }
        switch (element.kind) {
            case SyntaxKind.SourceUnit: return visitor.visitSourceUnit(<SourceUnitSyntax>element);
            case SyntaxKind.QualifiedName: return visitor.visitQualifiedName(<QualifiedNameSyntax>element);
            case SyntaxKind.ObjectType: return visitor.visitObjectType(<ObjectTypeSyntax>element);
            case SyntaxKind.FunctionType: return visitor.visitFunctionType(<FunctionTypeSyntax>element);
            case SyntaxKind.ArrayType: return visitor.visitArrayType(<ArrayTypeSyntax>element);
            case SyntaxKind.ConstructorType: return visitor.visitConstructorType(<ConstructorTypeSyntax>element);
            case SyntaxKind.GenericType: return visitor.visitGenericType(<GenericTypeSyntax>element);
            case SyntaxKind.TypeQuery: return visitor.visitTypeQuery(<TypeQuerySyntax>element);
            case SyntaxKind.TupleType: return visitor.visitTupleType(<TupleTypeSyntax>element);
            case SyntaxKind.UnionType: return visitor.visitUnionType(<UnionTypeSyntax>element);
            case SyntaxKind.ParenthesizedType: return visitor.visitParenthesizedType(<ParenthesizedTypeSyntax>element);
            case SyntaxKind.InterfaceDeclaration: return visitor.visitInterfaceDeclaration(<InterfaceDeclarationSyntax>element);
            case SyntaxKind.FunctionDeclaration: return visitor.visitFunctionDeclaration(<FunctionDeclarationSyntax>element);
            case SyntaxKind.ModuleDeclaration: return visitor.visitModuleDeclaration(<ModuleDeclarationSyntax>element);
            case SyntaxKind.ClassDeclaration: return visitor.visitClassDeclaration(<ClassDeclarationSyntax>element);
            case SyntaxKind.EnumDeclaration: return visitor.visitEnumDeclaration(<EnumDeclarationSyntax>element);
            case SyntaxKind.ImportDeclaration: return visitor.visitImportDeclaration(<ImportDeclarationSyntax>element);
            case SyntaxKind.ExportAssignment: return visitor.visitExportAssignment(<ExportAssignmentSyntax>element);
            case SyntaxKind.MethodDeclaration: return visitor.visitMethodDeclaration(<MethodDeclarationSyntax>element);
            case SyntaxKind.PropertyDeclaration: return visitor.visitPropertyDeclaration(<PropertyDeclarationSyntax>element);
            case SyntaxKind.ConstructorDeclaration: return visitor.visitConstructorDeclaration(<ConstructorDeclarationSyntax>element);
            case SyntaxKind.GetAccessor: return visitor.visitGetAccessor(<GetAccessorSyntax>element);
            case SyntaxKind.SetAccessor: return visitor.visitSetAccessor(<SetAccessorSyntax>element);
            case SyntaxKind.PropertySignature: return visitor.visitPropertySignature(<PropertySignatureSyntax>element);
            case SyntaxKind.CallSignature: return visitor.visitCallSignature(<CallSignatureSyntax>element);
            case SyntaxKind.ConstructSignature: return visitor.visitConstructSignature(<ConstructSignatureSyntax>element);
            case SyntaxKind.IndexSignature: return visitor.visitIndexSignature(<IndexSignatureSyntax>element);
            case SyntaxKind.MethodSignature: return visitor.visitMethodSignature(<MethodSignatureSyntax>element);
            case SyntaxKind.Block: return visitor.visitBlock(<BlockSyntax>element);
            case SyntaxKind.IfStatement: return visitor.visitIfStatement(<IfStatementSyntax>element);
            case SyntaxKind.VariableStatement: return visitor.visitVariableStatement(<VariableStatementSyntax>element);
            case SyntaxKind.ExpressionStatement: return visitor.visitExpressionStatement(<ExpressionStatementSyntax>element);
            case SyntaxKind.ReturnStatement: return visitor.visitReturnStatement(<ReturnStatementSyntax>element);
            case SyntaxKind.SwitchStatement: return visitor.visitSwitchStatement(<SwitchStatementSyntax>element);
            case SyntaxKind.BreakStatement: return visitor.visitBreakStatement(<BreakStatementSyntax>element);
            case SyntaxKind.ContinueStatement: return visitor.visitContinueStatement(<ContinueStatementSyntax>element);
            case SyntaxKind.ForStatement: return visitor.visitForStatement(<ForStatementSyntax>element);
            case SyntaxKind.ForInStatement: return visitor.visitForInStatement(<ForInStatementSyntax>element);
            case SyntaxKind.EmptyStatement: return visitor.visitEmptyStatement(<EmptyStatementSyntax>element);
            case SyntaxKind.ThrowStatement: return visitor.visitThrowStatement(<ThrowStatementSyntax>element);
            case SyntaxKind.WhileStatement: return visitor.visitWhileStatement(<WhileStatementSyntax>element);
            case SyntaxKind.TryStatement: return visitor.visitTryStatement(<TryStatementSyntax>element);
            case SyntaxKind.LabeledStatement: return visitor.visitLabeledStatement(<LabeledStatementSyntax>element);
            case SyntaxKind.DoStatement: return visitor.visitDoStatement(<DoStatementSyntax>element);
            case SyntaxKind.DebuggerStatement: return visitor.visitDebuggerStatement(<DebuggerStatementSyntax>element);
            case SyntaxKind.WithStatement: return visitor.visitWithStatement(<WithStatementSyntax>element);
            case SyntaxKind.PrefixUnaryExpression: return visitor.visitPrefixUnaryExpression(<PrefixUnaryExpressionSyntax>element);
            case SyntaxKind.DeleteExpression: return visitor.visitDeleteExpression(<DeleteExpressionSyntax>element);
            case SyntaxKind.TypeOfExpression: return visitor.visitTypeOfExpression(<TypeOfExpressionSyntax>element);
            case SyntaxKind.VoidExpression: return visitor.visitVoidExpression(<VoidExpressionSyntax>element);
            case SyntaxKind.ConditionalExpression: return visitor.visitConditionalExpression(<ConditionalExpressionSyntax>element);
            case SyntaxKind.BinaryExpression: return visitor.visitBinaryExpression(<BinaryExpressionSyntax>element);
            case SyntaxKind.PostfixUnaryExpression: return visitor.visitPostfixUnaryExpression(<PostfixUnaryExpressionSyntax>element);
            case SyntaxKind.PropertyAccessExpression: return visitor.visitPropertyAccessExpression(<PropertyAccessExpressionSyntax>element);
            case SyntaxKind.InvocationExpression: return visitor.visitInvocationExpression(<InvocationExpressionSyntax>element);
            case SyntaxKind.ArrayLiteralExpression: return visitor.visitArrayLiteralExpression(<ArrayLiteralExpressionSyntax>element);
            case SyntaxKind.ObjectLiteralExpression: return visitor.visitObjectLiteralExpression(<ObjectLiteralExpressionSyntax>element);
            case SyntaxKind.ObjectCreationExpression: return visitor.visitObjectCreationExpression(<ObjectCreationExpressionSyntax>element);
            case SyntaxKind.ParenthesizedExpression: return visitor.visitParenthesizedExpression(<ParenthesizedExpressionSyntax>element);
            case SyntaxKind.ParenthesizedArrowFunctionExpression: return visitor.visitParenthesizedArrowFunctionExpression(<ParenthesizedArrowFunctionExpressionSyntax>element);
            case SyntaxKind.SimpleArrowFunctionExpression: return visitor.visitSimpleArrowFunctionExpression(<SimpleArrowFunctionExpressionSyntax>element);
            case SyntaxKind.TypeAssertionExpression: return visitor.visitTypeAssertionExpression(<TypeAssertionExpressionSyntax>element);
            case SyntaxKind.ElementAccessExpression: return visitor.visitElementAccessExpression(<ElementAccessExpressionSyntax>element);
            case SyntaxKind.FunctionExpression: return visitor.visitFunctionExpression(<FunctionExpressionSyntax>element);
            case SyntaxKind.OmittedExpression: return visitor.visitOmittedExpression(<OmittedExpressionSyntax>element);
            case SyntaxKind.TemplateExpression: return visitor.visitTemplateExpression(<TemplateExpressionSyntax>element);
            case SyntaxKind.TemplateAccessExpression: return visitor.visitTemplateAccessExpression(<TemplateAccessExpressionSyntax>element);
            case SyntaxKind.YieldExpression: return visitor.visitYieldExpression(<YieldExpressionSyntax>element);
            case SyntaxKind.AwaitExpression: return visitor.visitAwaitExpression(<AwaitExpressionSyntax>element);
            case SyntaxKind.VariableDeclaration: return visitor.visitVariableDeclaration(<VariableDeclarationSyntax>element);
            case SyntaxKind.VariableDeclarator: return visitor.visitVariableDeclarator(<VariableDeclaratorSyntax>element);
            case SyntaxKind.ArgumentList: return visitor.visitArgumentList(<ArgumentListSyntax>element);
            case SyntaxKind.ParameterList: return visitor.visitParameterList(<ParameterListSyntax>element);
            case SyntaxKind.TypeArgumentList: return visitor.visitTypeArgumentList(<TypeArgumentListSyntax>element);
            case SyntaxKind.TypeParameterList: return visitor.visitTypeParameterList(<TypeParameterListSyntax>element);
            case SyntaxKind.HeritageClause: return visitor.visitHeritageClause(<HeritageClauseSyntax>element);
            case SyntaxKind.EqualsValueClause: return visitor.visitEqualsValueClause(<EqualsValueClauseSyntax>element);
            case SyntaxKind.CaseSwitchClause: return visitor.visitCaseSwitchClause(<CaseSwitchClauseSyntax>element);
            case SyntaxKind.DefaultSwitchClause: return visitor.visitDefaultSwitchClause(<DefaultSwitchClauseSyntax>element);
            case SyntaxKind.ElseClause: return visitor.visitElseClause(<ElseClauseSyntax>element);
            case SyntaxKind.CatchClause: return visitor.visitCatchClause(<CatchClauseSyntax>element);
            case SyntaxKind.FinallyClause: return visitor.visitFinallyClause(<FinallyClauseSyntax>element);
            case SyntaxKind.TemplateClause: return visitor.visitTemplateClause(<TemplateClauseSyntax>element);
            case SyntaxKind.TypeParameter: return visitor.visitTypeParameter(<TypeParameterSyntax>element);
            case SyntaxKind.Constraint: return visitor.visitConstraint(<ConstraintSyntax>element);
            case SyntaxKind.Parameter: return visitor.visitParameter(<ParameterSyntax>element);
            case SyntaxKind.EnumElement: return visitor.visitEnumElement(<EnumElementSyntax>element);
            case SyntaxKind.TypeAnnotation: return visitor.visitTypeAnnotation(<TypeAnnotationSyntax>element);
            case SyntaxKind.ExpressionBody: return visitor.visitExpressionBody(<ExpressionBody>element);
            case SyntaxKind.ComputedPropertyName: return visitor.visitComputedPropertyName(<ComputedPropertyNameSyntax>element);
            case SyntaxKind.PropertyAssignment: return visitor.visitPropertyAssignment(<PropertyAssignmentSyntax>element);
            case SyntaxKind.TypeAlias: return visitor.visitTypeAlias(<TypeAliasSyntax>element);
            case SyntaxKind.ExternalModuleReference: return visitor.visitExternalModuleReference(<ExternalModuleReferenceSyntax>element);
            case SyntaxKind.ModuleNameModuleReference: return visitor.visitModuleNameModuleReference(<ModuleNameModuleReferenceSyntax>element);
            default: return visitor.visitToken(<ISyntaxToken>element);
        }
    }

    export interface ISyntaxVisitor {
        visitToken(token: ISyntaxToken): any;
        visitSourceUnit(node: SourceUnitSyntax): any;
        visitQualifiedName(node: QualifiedNameSyntax): any;
        visitObjectType(node: ObjectTypeSyntax): any;
        visitFunctionType(node: FunctionTypeSyntax): any;
        visitArrayType(node: ArrayTypeSyntax): any;
        visitConstructorType(node: ConstructorTypeSyntax): any;
        visitGenericType(node: GenericTypeSyntax): any;
        visitTypeQuery(node: TypeQuerySyntax): any;
        visitTupleType(node: TupleTypeSyntax): any;
        visitUnionType(node: UnionTypeSyntax): any;
        visitParenthesizedType(node: ParenthesizedTypeSyntax): any;
        visitInterfaceDeclaration(node: InterfaceDeclarationSyntax): any;
        visitFunctionDeclaration(node: FunctionDeclarationSyntax): any;
        visitModuleDeclaration(node: ModuleDeclarationSyntax): any;
        visitClassDeclaration(node: ClassDeclarationSyntax): any;
        visitEnumDeclaration(node: EnumDeclarationSyntax): any;
        visitImportDeclaration(node: ImportDeclarationSyntax): any;
        visitExportAssignment(node: ExportAssignmentSyntax): any;
        visitMethodDeclaration(node: MethodDeclarationSyntax): any;
        visitPropertyDeclaration(node: PropertyDeclarationSyntax): any;
        visitConstructorDeclaration(node: ConstructorDeclarationSyntax): any;
        visitGetAccessor(node: GetAccessorSyntax): any;
        visitSetAccessor(node: SetAccessorSyntax): any;
        visitPropertySignature(node: PropertySignatureSyntax): any;
        visitCallSignature(node: CallSignatureSyntax): any;
        visitConstructSignature(node: ConstructSignatureSyntax): any;
        visitIndexSignature(node: IndexSignatureSyntax): any;
        visitMethodSignature(node: MethodSignatureSyntax): any;
        visitBlock(node: BlockSyntax): any;
        visitIfStatement(node: IfStatementSyntax): any;
        visitVariableStatement(node: VariableStatementSyntax): any;
        visitExpressionStatement(node: ExpressionStatementSyntax): any;
        visitReturnStatement(node: ReturnStatementSyntax): any;
        visitSwitchStatement(node: SwitchStatementSyntax): any;
        visitBreakStatement(node: BreakStatementSyntax): any;
        visitContinueStatement(node: ContinueStatementSyntax): any;
        visitForStatement(node: ForStatementSyntax): any;
        visitForInStatement(node: ForInStatementSyntax): any;
        visitEmptyStatement(node: EmptyStatementSyntax): any;
        visitThrowStatement(node: ThrowStatementSyntax): any;
        visitWhileStatement(node: WhileStatementSyntax): any;
        visitTryStatement(node: TryStatementSyntax): any;
        visitLabeledStatement(node: LabeledStatementSyntax): any;
        visitDoStatement(node: DoStatementSyntax): any;
        visitDebuggerStatement(node: DebuggerStatementSyntax): any;
        visitWithStatement(node: WithStatementSyntax): any;
        visitPrefixUnaryExpression(node: PrefixUnaryExpressionSyntax): any;
        visitDeleteExpression(node: DeleteExpressionSyntax): any;
        visitTypeOfExpression(node: TypeOfExpressionSyntax): any;
        visitVoidExpression(node: VoidExpressionSyntax): any;
        visitConditionalExpression(node: ConditionalExpressionSyntax): any;
        visitBinaryExpression(node: BinaryExpressionSyntax): any;
        visitPostfixUnaryExpression(node: PostfixUnaryExpressionSyntax): any;
        visitPropertyAccessExpression(node: PropertyAccessExpressionSyntax): any;
        visitInvocationExpression(node: InvocationExpressionSyntax): any;
        visitArrayLiteralExpression(node: ArrayLiteralExpressionSyntax): any;
        visitObjectLiteralExpression(node: ObjectLiteralExpressionSyntax): any;
        visitObjectCreationExpression(node: ObjectCreationExpressionSyntax): any;
        visitParenthesizedExpression(node: ParenthesizedExpressionSyntax): any;
        visitParenthesizedArrowFunctionExpression(node: ParenthesizedArrowFunctionExpressionSyntax): any;
        visitSimpleArrowFunctionExpression(node: SimpleArrowFunctionExpressionSyntax): any;
        visitTypeAssertionExpression(node: TypeAssertionExpressionSyntax): any;
        visitElementAccessExpression(node: ElementAccessExpressionSyntax): any;
        visitFunctionExpression(node: FunctionExpressionSyntax): any;
        visitOmittedExpression(node: OmittedExpressionSyntax): any;
        visitTemplateExpression(node: TemplateExpressionSyntax): any;
        visitTemplateAccessExpression(node: TemplateAccessExpressionSyntax): any;
        visitYieldExpression(node: YieldExpressionSyntax): any;
        visitAwaitExpression(node: AwaitExpressionSyntax): any;
        visitVariableDeclaration(node: VariableDeclarationSyntax): any;
        visitVariableDeclarator(node: VariableDeclaratorSyntax): any;
        visitArgumentList(node: ArgumentListSyntax): any;
        visitParameterList(node: ParameterListSyntax): any;
        visitTypeArgumentList(node: TypeArgumentListSyntax): any;
        visitTypeParameterList(node: TypeParameterListSyntax): any;
        visitHeritageClause(node: HeritageClauseSyntax): any;
        visitEqualsValueClause(node: EqualsValueClauseSyntax): any;
        visitCaseSwitchClause(node: CaseSwitchClauseSyntax): any;
        visitDefaultSwitchClause(node: DefaultSwitchClauseSyntax): any;
        visitElseClause(node: ElseClauseSyntax): any;
        visitCatchClause(node: CatchClauseSyntax): any;
        visitFinallyClause(node: FinallyClauseSyntax): any;
        visitTemplateClause(node: TemplateClauseSyntax): any;
        visitTypeParameter(node: TypeParameterSyntax): any;
        visitConstraint(node: ConstraintSyntax): any;
        visitParameter(node: ParameterSyntax): any;
        visitEnumElement(node: EnumElementSyntax): any;
        visitTypeAnnotation(node: TypeAnnotationSyntax): any;
        visitExpressionBody(node: ExpressionBody): any;
        visitComputedPropertyName(node: ComputedPropertyNameSyntax): any;
        visitPropertyAssignment(node: PropertyAssignmentSyntax): any;
        visitTypeAlias(node: TypeAliasSyntax): any;
        visitExternalModuleReference(node: ExternalModuleReferenceSyntax): any;
        visitModuleNameModuleReference(node: ModuleNameModuleReferenceSyntax): any;
    }
}