(function($) {
	
	$.extend({
		"infoDialog" : function(content, func) {
			createrModal(0, null, content, func);
		},
		"warnDialog" : function(content, func) {
			createrModal(1, null, content, func);
		},
		"errorDialog" : function(content, func) {
			createrModal(2, null, content, func);
		},
		"confirm" : function(content) {
			createrModal(3, null, content, func);
		},
		"htmlSmDialog" : function(title, content, func) {
			createrModal(4, title, content, func);
		},
		"htmlLgDialog" : function(title, content, func) {
			createrModal(5, title, content, func);
		},
		"htmlDialog" : function(title, content, func) {
			createrModal(6, title, content, func);
		},
		"picDialog" : function(title, content, func) {
			createrModal(7, title, content, func);
		},
		"clearDialog" : function() {
			$("#myModal").remove();
		},
		"hideModal" : function() {
			$('#myModal').modal('hide');
		},
		"loading" : function() {
			$("#myModal").remove();
			createLoading();
			$('#myModal').modal('show');
		}
	});
	
	function createrModal(flag, title, content, func) {
		var dailogInfo = judgeDialogInfo(flag, title);
		$("#myModal").remove();
		createDialog(flag, dailogInfo, content);
		
		$('#myModal').modal('show');
		$("#myModal").modal().css({
			"margin-top": function () {
//				return $(this).height() / 2;
			}
		});

		$("#modalBtnOk").click(function(){
			if (null == func) {
				$('#myModal').modal('hide');
				$("#myModal").remove();
			} else if(typeof func == 'function') {
				if (func()) $('#myModal').modal('hide');
			}
		});
	}
	
	function createDialog(flag, dailogInfo, content) {
		var html = "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">";
		
		var modalSize = "";
		if (flag == 4) {
			modalSize = "modal-sm";
		} else if (flag == 5) {
			modalSize = "modal-lg";
		}
		
		html += "<div class=\"modal-dialog " + modalSize + "\" role=\"document\">";
		html += "<div class=\"modal-content\">";
		html += "<div class=\"modal-header\">";
		html += "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>";
		html += "<h4 class=\"modal-title\" id=\"myModalLabel\">"+ dailogInfo.title +"</h4>";
		html += "</div>";
		html += "<div class=\"modal-body\">";
		html += content;
		html += "</div>";
		html += "<div class=\"modal-footer\">";
		
		var dataDismiss = "data-dismiss=\"modal\"";
		if (flag == 4 || flag == 5 || flag == 6) {
			html += "<button type=\"button\" id=\"modalBtnCancel\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button>";
			dataDismiss = "";
		}

		if (flag != 7) {
			html += "<button type=\"button\" id=\"modalBtnOk\" class=\"btn " + dailogInfo.buttonClass + "\" "+ dataDismiss + ">确定</button>";
		}
		html += "</div>";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		$("body").append(html);
	};
	
	function judgeDialogInfo(flag, title) {
		var opts = {
			title: "",
			buttonClass: ""
		};
		switch(flag) {
		case 0 : opts.title = "INFO";
				 opts.buttonClass = "btn-info";
				 break;
		case 1 : opts.title = "WARNNIG";
				 opts.buttonClass = "btn-warning";
				 break;
		case 2 : opts.title = "ERROR";
				 opts.buttonClass = "btn-danger";
				 break;
		case 4 :
		case 5 :
		case 6 :
		case 7 : opts.title = title;
				 opts.buttonClass = "btn-success";
				 break;
		}
		return opts;
	}
	
	function createLoading() {
		var html = "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">";
		
		html += "<div class=\"modal-dialog modal-sm\" role=\"document\">";
		html += "<div class=\"modal-content\">";
		html += "";
		html += "</div>";
		html += "</div>";
		html += "</div>";
		$("body").append(html);
	}
})(window.jQuery);
