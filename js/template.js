(function(window){
	function compile(template,selector,data=""){
		//没有参数抛出错误
		if(arguments.length==0){
			throw new Error("lost important parameter!");
		}
		//选择器不能为空
		if(selector==null || selector==''){
			throw new Error("selector can't be null!");
		}
		const evalExpr = /<%=(.+?)%>/g;
		const expr = /<%([\s\S]+?)%>/g;
		if(evalExpr.test(template)||expr.test(template)){
			if(data==''||data==null){
				throw new Error("data can't be null!");
			}
		}
		template = template
		.replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
		.replace(expr, '`); \n $1 \n  echo(`');

		template = 'echo(`' + template + '`);';

		let script =
		`(function parse(data){
		let output = "";

		function echo(html){
		  output += html;
		}

		${ template }

		return output;
		})`;
		try{
			$(selector).html(eval(script)(data));
		}catch(e){
			throw new Error("data's format is error");
		}
		
		// return eval(script);
	}
	window.zkk={compile};
})(window)

// let template = `
// <ul>
//   <% for(let i=0; i < data.supplies.length; i++) { %>
//     <li><%= data.supplies[i] %></li>
//   <% } %>
// </ul>
// `;