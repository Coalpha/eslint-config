module.exports={extends:["eslint:recommended"],env:{es6:true},parserOptions:{ecmaVersion:2019,sourceType:"module",ecmaFeatures:{objectLiteralDuplicateProperties:false}},rules:{0:{"accessor-pairs":1,"array-callback-return":[1,{allowImplicit:1}],"class-methods-use-this":[1],"consistent-return":[1,{treatUndefinedAsUnspecified:1}],curly:[2,"multi-or-nest","consistent"],"default-case":[1,{commentPattern:"^no default$"}],"dot-location":[2,"property"],"dot-notation":[2,{allowKeywords:1}],eqeqeq:[2,"smart"],"guard-for-in":2,"no-alert":1,"no-caller":2,"no-else-return":[2,{allowElseIf:0}],"no-eq-null":2,"no-eval":1,"no-extend-native":1,"no-extra-bind":2,"no-extra-label":2,"no-fallthrough":1,"no-floating-decimal":1,"no-implicit-coercion":[1,{boolean:0}],"no-implied-eval":1,"no-invalid-this":2,"no-iterator":2,"no-loop-func":2,"no-multi-spaces":2,"no-new":2,"no-new-func":1,"no-new-wrappers":2,"no-param-reassign":[2,{props:1,ignorePropertyModificationsFor:["acc","accumulator","e","ctx","req","request","res","response","$scope"]}],"no-proto":2,"no-redeclare":2,"no-restricted-properties":[2,{object:"arguments",property:"callee",message:"arguments.callee is deprecated"},{object:"global",property:"isFinite",message:"Use Number.isFinite instead"},{object:"self",property:"isFinite",message:"Use Number.isFinite instead"},{object:"window",property:"isFinite",message:"Use Number.isFinite instead"},{object:"global",property:"isNaN",message:"Use Number.isNaN instead"},{object:"self",property:"isNaN",message:"Use Number.isNaN instead"},{object:"window",property:"isNaN",message:"Use Number.isNaN instead"},{property:"__defineGetter__",message:"Use Object.defineProperty instead"},{property:"__defineSetter__",message:"Use Object.defineProperty instead"},{object:"Math",property:"pow",message:"Use ** instead"}],"no-return-assign":[1,"always"],"no-return-await":2,"no-script-url":1,"no-self-compare":2,"no-sequences":1,"no-throw-literal":2,"no-unmodified-loop-condition":2,"no-unused-expressions":2,"no-unused-labels":1,"no-useless-call":1,"no-useless-catch":1,"no-useless-concat":1,"no-useless-return":1,"no-with":1,"prefer-promise-reject-errors":2,radix:2,"require-await":1,"vars-on-top":1,"wrap-iife":[2,"outside"],yoda:1},1:{"no-async-promise-executor":2,"no-await-in-loop":1,"no-console":"off","no-misleading-character-class":2,"no-prototype-builtins":1,"no-template-curly-in-string":2,"require-atomic-updates":2},2:{"callback-return":1,"global-require":2,"no-buffer-constructor":2,"no-new-require":2,"no-path-concat":1,"no-process-env":1,"no-process-exit":1},3:{"array-bracket-newline":[2,"consistent"],"array-bracket-spacing":1,"array-element-newline":[2,"consistent"],"block-spacing":2,"brace-style":[2,"1tbs",{allowSingleLine:1}],"capitalized-comments":[1,"never"],"comma-dangle":[2,"only-multiline"],"comma-spacing":2,"comma-style":[2,"last"],"computed-property-spacing":2,"consistent-this":1,"eol-last":2,"func-call-spacing":2,"func-names":[1,"as-needed"],"func-style":[1,"declaration",{allowArrowFunctions:1}],"function-paren-newline":[2,"consistent"],"implicit-arrow-linebreak":2,indent:[2,2,{SwitchCase:1}],"key-spacing":2,"keyword-spacing":2,"linebreak-style":2,"lines-between-class-members":1,"max-len":[1,100,2],"multiline-comment-style":1,"new-cap":[1,{capIsNew:0}],"new-parens":1,"newline-per-chained-call":[1,{ignoreChainWithDepth:4}],"no-array-constructor":1,"no-lonely-if":2,"no-multiple-empty-lines":1,"no-negated-condition":2,"no-new-object":2,"no-restricted-syntax":[2,{selector:"ForInStatement",message:"for..in iterates over the entire prototype chain, catching any mistakenly enumerable values"},{selector:"WithStatement",message:"`with` destroys performance and makes code harder to understand"}],"no-tabs":2,"no-trailing-spaces":2,"no-unneeded-ternary":2,"no-whitespace-before-property":2,"nonblock-statement-body-position":2,"object-curly-newline":[2,{consistent:1}],"object-property-newline":[2,{allowAllPropertiesOnSameLine:1}],"one-var":[1,{initialized:"never"}],"one-var-declaration-per-line":[2,"initializations"],"operator-assignment":[1,"always"],"operator-linebreak":[1,"before"],"prefer-object-spread":1,"quote-props":[2,"consistent-as-needed",{keywords:1}],quotes:2,semi:2,"semi-spacing":2,"semi-style":2,"space-before-blocks":2,"space-before-function-paren":[2,{anonymous:"always",named:"never",asyncArrow:"always"}],"space-in-parens":2,"space-infix-ops":2,"space-unary-ops":[2,{words:1,nonwords:0}],"spaced-comment":2,"switch-colon-spacing":2,"template-tag-spacing":2,"unicode-bom":1},4:{"no-delete-var":1,"no-label-var":1,"no-restricted-globals":[1,"addEventListener","blur","close","closed","confirm","defaultStatus","defaultstatus","error","event","external","find","focus","frameElement","frames","history","innerHeight","innerWidth","isFinite","isNaN","length","location","locationbar","menubar","moveBy","moveTo","name","onblur","onerror","onfocus","onload","onresize","onunload","open","opener","opera","outerHeight","outerWidth","pageXOffset","pageYOffset","parent","print","removeEventListener","resizeBy","resizeTo","screen","screenLeft","screenTop","screenX","screenY","scroll","scrollbars","scrollBy","scrollTo","scrollX","scrollY","self","status","statusbar","stop","toolbar","top"],"no-shadow":2,"no-shadow-restricted-names":2,"no-undef-init":1,"no-use-before-define":2}}}
