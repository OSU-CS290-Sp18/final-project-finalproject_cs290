(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['profile'] = template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<article class=\"profile\">\r\n    <div class=\"profile-content\">\r\n        <div class =\"title-content\">\r\n            <button type=\"button\" id=\"delete-profile-button\"><i class=\"fas fa-times\"></i></button>\r\n            <p class = \"profile-name\">\r\n                "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\r\n            </p>\r\n        </div>\r\n        <p class = \"photo-container\">\r\n            <img class = \"profile-photo\" src =\""
    + alias4(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "\"/>\r\n        </p>\r\n        <p class=\"profile-description\">\r\n            "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\r\n        </p>\r\n    </div>\r\n    <div class = \"heart-content\">\r\n        <button type=\"button\" id=\"like-button\"><i class=\"fas fa-heart\"></i></button>\r\n        <p class = \"hearts\">\r\n            "
    + alias4(((helper = (helper = helpers.hearts || (depth0 != null ? depth0.hearts : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"hearts","hash":{},"data":data}) : helper)))
    + "\r\n        </p>\r\n    </div>\r\n</article>\r\n";
},"useData":true});
})();