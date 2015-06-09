app.product = {
	init: function() {
		console.log("product init")
		$(document).ready(app.product.start);
	},
	start: function() {
		$("#imagezoomed").zoom();
		$(".images .leftcolumn a").click(app.product.imageClick);
		$(".images .mobileimage a").click(app.product.imageClick);

		$(".sizeingchart").click(app.product.sizingchart.open);
		$(".mini").click(app.product.sizingchart.close);
		$(".sizing").click(app.product.sizingchart.close)
		// $("#sizesmenue a").click(function(event) {
		// 	event.preventDefault();
		// 	var val = this.href.split("/")
		// 	val = val[val.length - 1];
		// 	console.log(val)
		// 	$("#sizemenue .selected").removeClass("selected");
		// 	$(this.parentNode).addClass("selected");
		// 	$("#selector select").val(val);
		// 	return false;
		// });

		if (!app.detectMobile()) {
			app.product.dropdownsize.init();
		}
	},
	imageClick: function click(event) {
		event.preventDefault();
		var target = $("#imagezoomed");
		target.trigger('zoom.destroy');
		target.find("img")[0].src = this.href;
		target.zoom()
		return false;
	},
	sizingchart: {
		open: function() {
			var el = $(".sizing"),
				div = el.find(">div");
			el.addClass("open");
			el.height(div.outerHeight());
			setTimeout(function() {
				el.height("auto");
			}, 500)
		},
		close: function(event) {
			event.preventDefault();
			var el = $(".sizing"),
				div = el.find(">div");
			el.height(div.outerHeight());
			setTimeout(function() {
				el.height(0);
				el.removeClass("open");
			}, 10)
			return false;
		}
	},
	dropdownsize: {
		init: function() {
			$("#sizeselector").addClass("desktop");
			app.product.dropdownsize.size();
			$("#sizesmenue a").click(app.product.dropdownsize.noreactlink);
			$("#sizesmenue").click(app.product.dropdownsize.toggle);
			$("#wrapper").click(app.product.dropdownsize.closeIfOpen);
		},
		size: function() {
			$("#sizesmenue").height($("#sizesmenue li").height())
		},
		toggle: function(event) {
			event.preventDefault();
			$("#sizesmenue").toggleClass("show");
			return false;
		},
		noreactlink: function(event) {
			event.preventDefault();
			var parent = $(this.parentNode.parentNode.parentNode);
			if (parent.hasClass("show")) {
				var val = this.href.split("/")
				val = val[val.length - 1];
				$("#selector select").val(val);

				this.parentNode.parentNode.style.top = "-" + $(this.parentNode).position().top + "px";


				$(this.parentNode.parentNode).find(".selected").removeClass("selected");
				$(this).addClass("selected");
				parent.toggleClass("show");
			} else {
				parent.toggleClass("show");
			}
			console.log("noreactlink");
			return false;
		},
		closeIfOpen: function(event) {
			var parent = $("#sizesmenue");
			if (parent.hasClass("show")) {
				event.preventDefault();
				parent.removeClass("show");
				return false;
			}
		}

	}

}