(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  mediator = require('mediator');

  routes = require('routes');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'Dr PC Computer & Laptop Repair Belfast';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initComposer();
      this.initMediator();
      this.initRouter(routes);
      this.startRouting();
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initMediator = function() {
      return Chaplin.mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller, FooterView, HeaderView, SiteView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  SiteView = require('views/site-view');

  HeaderView = require('views/view-controllers/page/header-view');

  FooterView = require('views/view-controllers/page/footer-view');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.prototype.beforeAction = {
      '.*': function() {
        this.compose('site', SiteView);
        this.compose('header', HeaderView);
        return this.compose('footer', FooterView);
      }
    };

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/home-controller", function(exports, require, module) {
  var AppointmentsView, ContactView, Controller, HomeController, HomePageView, PricesView, QuoteView,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HomePageView = require('views/view-controllers/home/home-page-view');

  AppointmentsView = require('views/view-controllers/appointment/appointments-view');

  PricesView = require('views/view-controllers/prices/prices-view');

  ContactView = require('views/view-controllers/contact/contact-view');

  QuoteView = require('views/quote-view');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      this.quote = __bind(this.quote, this);
      this.contact = __bind(this.contact, this);
      this.prices = __bind(this.prices, this);
      this.appointments = __bind(this.appointments, this);
      HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.index = function() {
      return this.view = new HomePageView({
        region: 'main'
      });
    };

    HomeController.prototype.appointments = function() {
      return this.view = new AppointmentsView();
    };

    HomeController.prototype.prices = function() {
      return this.view = new PricesView();
    };

    HomeController.prototype.contact = function() {
      return this.view = new ContactView();
    };

    HomeController.prototype.quote = function() {
      return this.view = new QuoteView();
    };

    return HomeController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    return (new Application).initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var Chaplin,
    __slice = [].slice;

  Chaplin = require('chaplin');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });

  Handlebars.registerHelper('url', function() {
    var options, params, routeName, _i;
    routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
    return Chaplin.helpers.reverse(routeName, params);
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("routes", function(exports, require, module) {
  
  module.exports = function(match) {
    match('', 'home#index');
    match('Appointments', 'home#appointments');
    match('Prices', 'home#prices');
    match('Contact', 'home#contact');
    return match('Quick-Quote', 'home#quote');
  };
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/quote-view", function(exports, require, module) {
  var QuoteView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/quote');

  View = require('views/base/view');

  module.exports = QuoteView = (function(_super) {

    __extends(QuoteView, _super);

    function QuoteView() {
      this.render = __bind(this.render, this);
      QuoteView.__super__.constructor.apply(this, arguments);
    }

    QuoteView.prototype.autoRender = true;

    QuoteView.prototype.className = 'quote-page';

    QuoteView.prototype.container = '#page-container';

    QuoteView.prototype.template = template;

    QuoteView.prototype.render = function() {
      this.$el.hide();
      QuoteView.__super__.render.apply(this, arguments);
      return this.$el.fadeIn();
    };

    return QuoteView;

  })(View);
  
});
window.require.register("views/site-view", function(exports, require, module) {
  var SiteView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/site');

  module.exports = SiteView = (function(_super) {

    __extends(SiteView, _super);

    function SiteView() {
      SiteView.__super__.constructor.apply(this, arguments);
    }

    SiteView.prototype.container = 'body';

    SiteView.prototype.id = 'site-container';

    SiteView.prototype.regions = {
      '#header-container': 'header',
      '#page-container': 'main',
      '#footer-container': 'footer'
    };

    SiteView.prototype.template = template;

    return SiteView;

  })(View);
  
});
window.require.register("views/templates/appointment/appointments", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"presenter\">\r\n\r\n<div class=\"row\">\r\n<h1>Make an Appointment</h1>\r\n</div>\r\n\r\n<div class=\"row\">\r\n<p> To make an appointment for our free collect & return service, simply select your \r\n       region, pick a date that suits, and fill in a few details:</p>\r\n   <p>We begin our collections from 5:30 in the evenings and service the Belfast &amp; \r\n       Downpatrick areas. </p>\r\n        <p>If you include your mobile number we can send you an automatic text when we are \r\n            nearly with you.</p>\r\n        \r\n        \r\n        <div align=left> <span class=\"style1\">Collection Days:<br /><b>Mon &amp; Thur&nbsp;&nbsp;&nbsp; \r\n            </b>&nbsp;5:30pm - 8pm<br />\r\n            <br />\r\n        \r\n    </span>\r\n            For customers outside our service area, or those who would prefer to bring the \r\n            machine to us <strong><span>Mon - Thur</span> </strong>please <span><a href=\"/BringToUs\">\r\n            click here</a><br />\r\n   \r\n    \r\n    \r\n        </div>\r\n        \r\n    </span>\r\n   \r\n   \r\n    \r\n</div>\r\n\r\n\r\n\r\n  <div id=\"appointmentWizard-container\" class=\"row\">\r\n\r\n</div>\r\n\r\n<div>\r\n<img class=\"pull-right pull-down\" src=\"images/bookimage.jpg\" style=\"width: 283px; height: 424px\" /></div>\r\n</div>\r\n\r\n</div>";});
});
window.require.register("views/templates/contact/contact", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"presenter\">\r\n\r\n<h1>Contact us</h1>\r\n<p>\r\n        By clicking on the chat icon below you can see if one of our team are online to\r\n        talk to you there and then about your issue.&nbsp;</p>\r\n        <p>\r\n            Livehelp chat is:\r\n        </p>\r\n        <!--<div id=\"apDiv14\">\r\n            <!-- stardevelop.com Live Help International Copyright - All Rights Reserved //-->\r\n            <!-- BEGIN Live Help HTML Code - NOT PERMITTED TO MODIFY IMAGE MAP/CODE/LINKS //-->\r\n            <a href=\"http://www.drpcni.com/livehelp/index.php\" target=\"_blank\" onclick=\"openLiveHelp(); return false\">\r\n                <img src=\"http://www.drpcni.com/livehelp/include/status.php\" id=\"LiveHelpStatus\" name=\"LiveHelpStatus\"\r\n                    border=\"0\" alt=\"Live Help\" onload=\"statusImagesLiveHelp[statusImagesLiveHelp.length] = this;\" /></a>\r\n            <!-- END Live Help HTML -->\r\n        </div>-->\r\n        <p style=\"font-size: xx-small\">\r\n            (Click to continue)</p>\r\n        <p>\r\n            &nbsp;</p>\r\n        <p>\r\n            If you prefer you can leave us a quick <b><em>offline message</em></b> and we will get back to you.</p>\r\n       \r\n        <div class=\"row\">\r\n            \r\n			\r\n\r\n\r\n\r\n<div id=\"contactSuccess\" class=\"alert alert-success\" data-alert=\"alert\" target=\"#\">\r\n    <a class=\"close\" id=\"closeSuccess\">x</a>\r\n <div id=\"successMessage\"><p> <strong>Thank you for your message we will be in touch soon. </strong>Please check your junk mail just in case.</P></div>\r\n</div>\r\n\r\n<div id=\"contactError\" class=\"alert alert-error\" data-alert=\"alert\" target=\"#\">\r\n    <a class=\"close\" id=\"closeError\">x</a>\r\n <div id=\"errorMessage\"><p> <strong>Oops somethign has gone wrong. </strong>Please contact us on 07519746777 and we can sort you out.</P></div>\r\n</div>\r\n			<form id=\"ContactForm\" class=\"form-horizontal\">\r\n			  <div class=\"control-group\">\r\n			    <label class=\"control-label\" for=\"inputEmail\">Your Name</label>\r\n			    <div class=\"controls\">\r\n			      <input type=\"text\" id=\"contactName\" name=\"contactName\" placeholder=\"Your Name\">\r\n			    </div>\r\n			  </div>\r\n			    <div class=\"control-group\">\r\n			    <label class=\"control-label\" for=\"contactEmail\">Email or Phone</label>\r\n			    <div class=\"controls\">\r\n			      <input type=\"text\" id=\"contactEmail\" name=\"contactEmail\" placeholder=\"Email or Phone\">\r\n			    </div>\r\n			  </div>\r\n			  <div class=\"control-group\">\r\n			    <label class=\"control-label\" for=\"contactMessage\">Query</label>\r\n			    <div class=\"controls\">\r\n			      <textarea type=\"text\" id=\"contactMessage\" name=\"contactMessage\" rows=\"3\" placeholder=\"Query\"/>\r\n			    </div>\r\n			  </div>\r\n			  <div class=\"control-group\">\r\n			  	<label class=\"control-label\" for=\"inputDropDown\">How did you find us?</label>\r\n			  	<div class=\"controls\">\r\n			  		<select id=\"contactSource\" name=\"ContactSource\">\r\n  						<option>--Please Select--</option>\r\n  						<option>Google</option>\r\n  						<option>Returning Customer</option>\r\n  						<option>Other Website</option>\r\n  						<option>Other</option>\r\n					</select>\r\n			  	</div>\r\n			  </div>\r\n			  <div class=\"control-group\">\r\n			    <div class=\"controls\">			     \r\n			      <a id=\"submitContact\" class=\"btn\">Send</a>\r\n			    </div>\r\n			  </div>\r\n			</form>\r\n            \r\n    \r\n            <p style=\"text-align: left\">\r\n                Alternatively you can contact us by:</p>\r\n            <p style=\"text-align: left\">\r\n                Email: <a href=\"mailto:doctor@drpcni.com\">doctor@drpcni.com</strong></a></p>\r\n            <p style=\"text-align: left\">\r\n                Telephone: 07519746777\r\n            </p>\r\n            <p style=\"text-align: left\">\r\n                <span style=\"text-align: left\">If we cannot take your call there and then, please leave\r\n                    a message and we will reply as soon as possible</span>.\r\n            </p>\r\n        </div>\r\n\r\n</div>";});
});
window.require.register("views/templates/home/carousel", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "        <div id=\"topRowContent\">\r\n\r\n        <div class=\"span4\">\r\n            <div id=\"PostCodeRegion\">\r\n\r\n                <div id=\"WelcomeText\">\r\n          \r\n                    <p>Welcome to <strong><em>Dr PC Computer & Laptop Repair Belfast</em></strong>.</p>\r\n                    <p>\r\n                    To get a <strong><em>quick quote & find services in your</em></strong> enter your <strong><em>postcode</em></strong> in the box below and hit the enter key</p>\r\n                    <div id=\"validPostcode\" class=\"alert alert-error\">\r\n                    <div id=\"postcodeResult\"></div>\r\n                    </div>\r\n                    <p><input id=\"postcodeBox\" name=\"postcode\" class=\"postcodeboxdiv\" type=\"text\" value=\"BT\"></input>\r\n                </div>                    \r\n            </div>                       \r\n        </div>\r\n\r\n\r\n\r\n        <div class=\"span7\">\r\n\r\n<div id=\"myCarousel\" class=\"carousel slide\">\r\n                <ol class=\"carousel-indicators\">\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"0\" class=\"active\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"1\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"2\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"3\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"4\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"5\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"6\" class=\"\"></li>\r\n                  <li data-target=\"#myCarousel\" data-slide-to=\"7\" class=\"\"></li>\r\n                </ol>\r\n                <div class=\"carousel-inner\">\r\n                  <div class=\"item active\">\r\n                    <img src=\"/images/a1.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a2.jpg\" alt=\"\">\r\n                  \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a3.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a4.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a5.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a6.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a7.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                  <div class=\"item\">\r\n                    <img src=\"/images/a8.jpg\" alt=\"\">\r\n                   \r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n\r\n        </div>\r\n         </div>";});
});
window.require.register("views/templates/home/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"presenter\">\r\n    <div class=\"row\" id=\"topRow\">      \r\n\r\n    </div>\r\n\r\n\r\n    <div class=\"row\">\r\n      <div class=\"span4 homecols\">\r\n       \r\n                    <div class=\"row\">\r\n                        <a href=\"../aboutus\">\r\n                            <img src=\"/images/promises1.jpg\"  border=\"0\"></a>\r\n                    </div>\r\n\r\n                    <div class=\"row\">                        \r\n                            <div class=\"span1\">\r\n                                <img src=\"/images/promises2.jpg\">\r\n                            </div>\r\n                            <div class=\"span3\">We provide a reliable and affordable <em>Computer repair</em>\r\n                                service in the <em>Belfast</em> area -Why not <a href=\"../Book\"> <strong><em>Book an appointment now</em></strong></a> ?</div>\r\n                    \r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <img src=\"/images/promises7.jpg\" width=\"232\" height=\"23\">\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                    \r\n                            <div class=\"span1\">\r\n                                <img alt=\"\" src=\"/images/promises4.jpg\">\r\n                            </div>\r\n\r\n                            <div class=\"span3\">\r\n                                Virus removal - <b>£30</b>\r\n                                <br>\r\n                                Laptop screen fitted - <b>£40</b>\r\n                                <br>\r\n                                Memory Upgrade - <b>£30</b><br>\r\n                                VHS to DVD - <b>£10</b><br>\r\n                                Laptop keyboard fitted - <b>£20</b><br>\r\n                                Xbox &amp; PS3 repair - See <a href=\"../Prices\"><strong><em>Prices</em></strong></a>\r\n                            </div>\r\n\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <img src=\"/images/promises7.jpg\" alt=\"\" width=\"232\" height=\"23\">\r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                       \r\n                            <div class=\"span1\">\r\n                                <img src=\"/images/promises6.jpg\" width=\"67\" height=\"55\">\r\n                            </div>\r\n\r\n                            <div class=\"span3\">\r\n                                Using our online tracking system you can <i><a href=\"../login\">\r\n                                <strong>track your repair</strong></a></i> 24/7 \r\n                            </div>\r\n                        \r\n                    </div>\r\n\r\n                    <div class=\"row\">\r\n                        <img src=\"/images/promises7.jpg\" alt=\"\" width=\"232\" height=\"23\">\r\n                    </div>\r\n\r\n\r\n                    <div class=\"row\">\r\n                       \r\n                            <div class=\"span1\">\r\n                                <img src=\"/images/promises5.jpg\" width=\"67\" height=\"70\">\r\n                            </div>\r\n\r\n                            <div class=\"span3\">We are quite confident we can repair your computer. But in the\r\n                                event we cant fix your machine you <i>wont be charged</i> a penny</div>\r\n                      \r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <img src=\"/images/promises7.jpg\" alt=\"\" width=\"232\" height=\"23\">\r\n                    </div>\r\n                    <div class=\"row\">\r\n                        \r\n                            <div class=\"span1\">\r\n                                <img src=\"/images/promises3.jpg\" width=\"67\" height=\"72\"></div>\r\n                            <div class=\"span3\">We aim to have your machine back to you within <i>3 working days</i>\r\n                                or sooner. On some jobs we offer an express 24 hour repair service.&nbsp; Get a\r\n                                <strong><em><a href=\"/Quote/NoPostcodeQuote.aspx\">Quick Quote</a></em></strong> to find out if your \r\n                                job qualifies.</div>\r\n                       \r\n                    </div>\r\n                    <div class=\"row\">\r\n                        <img src=\"/images/promises7.jpg\" alt=\"\" width=\"232\" height=\"23\">\r\n                    </div>\r\n              \r\n      </div>\r\n\r\n      <div class=\"span4 homecols moveDown\">        \r\n            <div class=\"row giveUsABorder\">\r\n                    <h5>\r\n                        Virus Removal &amp; Data recovery</h5>\r\n                    Need a virus removal or data recovery service in Belfast?<br>\r\n                    No problem, we offer a range of affordable computer &amp; laptop repair services. We \r\n                    can help you remove viruses from your system and prevent them returning. Unlike \r\n                    some other companies we can work with you to ensure that your most important \r\n                    data is recovered from your hard drive. We also offer an express service on this \r\n                    job, get a <strong><em><a href=\"/Quote/NoPostcodeQuote.aspx\">quick quote</a></em></strong> to find \r\n                    out more.<br>\r\n                    <br>\r\n                    Our cheap virus removal, (format &amp; restore to factory settings) service is only\r\n                    <b>£40</b> or <b>£30</b> if you back up your own files before hand.<br>\r\n                    <br>\r\n                    Our affordable data recovery services start from £30 depending on the size of your\r\n                    hard drive.<br>\r\n                    <br>\r\n                    <img alt=\"\" src=\"/images/virus1.jpg\"><br>\r\n                    <br>\r\n                    <h5>\r\n                        VHS to DVD</h5>\r\n                    <p>\r\n                        Cheap VHS to DVD Conversion Service :\r\n                        <br>\r\n                        For <b>£10</b> per tape we can convert your old VHS into the more versatile DVD\r\n                        format.</p>\r\n                    <p>\r\n                        Camcorder to DVD Conversion Service :\r\n                        <br>\r\n                        For <b>£10</b> per tape we can convert your&nbsp; camcorder tapes into DVD format.</p>\r\n                    <p>\r\n                        &nbsp;<b>£5</b> For any additional copies or <strong>£10</strong> for four copies.</p>\r\n        </div>\r\n        \r\n      </div>\r\n\r\n\r\n\r\n      <div class=\"span4 homecols moveDown\">\r\n        <div class=\"row\">\r\n                    <h5>\r\n                        Laptop Screen Repair</h5>\r\n                    Faulty or cracked laptop screen?\r\n                    <p>\r\n                        Laptop Repair :</p>\r\n                    <p>\r\n                        Laptop screen replacement in Belfast for <b>£40</b>. Get a <a href=\"/Quote/NoPostcodeQuote.aspx\">\r\n                        <strong><em>Quick quote</em></strong></a>\r\n                        to find the full price for your make and model<p>\r\n                            .<img alt=\"\" class=\"laptopman\" src=\"/images/chat1.jpg\" /></p>\r\n                        <h5>\r\n                            XBox DVD Drive Repair</h5>\r\n                        Xbox discs not being read? Faulty xbox disc drive?<br />\r\n                        <br />\r\n                        For an affordable <strong>£60</strong> we offer an Xbox 360 DVD drive replacement\r\n                        service.&nbsp; We use an exact match drive to ensure your xbox does not get banned\r\n                        from live.<br />\r\n                        <br />\r\n                        Turn overtime for this repair depends on our supplier having the part. It takes\r\n                        us a day to switch the drive. Typical turn over 3-5 working days.\r\n                        <br />\r\n                        <a href=\"../Book\"><strong><em>Book an appointment now</em></strong></a>\r\n            </div>\r\n\r\n      </div>\r\n\r\n    </div>\r\n\r\n</div>";});
});
window.require.register("views/templates/home/inbound", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"topRowContent\">\r\n<h1> in</h1>\r\n</div>";});
});
window.require.register("views/templates/home/outbound", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"topRowContent\">\r\n<h1> outbound</h1>\r\n</div>";});
});
window.require.register("views/templates/home/quickQuote", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return " <div id=\"topRowContent\">\r\n<div id=\"view\" class=\"span12\">\r\n<div id=\"spinner\" class=\"pagination-centered\"></div>\r\n</div>\r\n<div id=\"manOnBike\"></div>\r\n </div>";});
});
window.require.register("views/templates/page/footer", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"navbar navbar-fixed-bottom\">\r\n        <p class=\"muted credit pull-right\">Copyright <a href=\"http://www.DrPCNI.com\">DrPCNI.com</a> 2013.</p>\r\n      </div>";});
});
window.require.register("views/templates/page/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"navbar navbar-fixed-top\">\r\n  <div class=\"navbar-inner\" id=\"titleBar\">\r\n    <div class=\"container\">\r\n\r\n      <!-- .btn-navbar is used as the toggle for collapsed navbar content -->  \r\n      <a class=\"btn btn-navbar\" data-toggle=\"collapse\" data-target=\".nav-collapse\">  \r\n        <span class=\"icon-bar\"></span>  \r\n        <span class=\"icon-bar\"></span>  \r\n        <span class=\"icon-bar\"></span>  \r\n      </a>  \r\n		<ul class=\"nav\">\r\n  			<li class=\"active\"><a class=\"brand\" href=\"/\">Home</a></li>\r\n  			<li><a href=\"/Appointments\">Appointments</a></li>\r\n  			<li><a href=\"/Prices\">Prices</a></li>\r\n  			<li><a href=\"/Contact\">Contact</a></li>\r\n  			<li><a href=\"/Quick-Quote\">Quick Quote</a></li>\r\n		</ul>	\r\n		\r\n    <ul class=\"nav pull-right\">\r\n        <li class=\"dropdown\"><a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">Track Your Repair<b class=\"caret\"></b></a>\r\n          <ul class=\"dropdown-menu\">\r\n            \r\n            <li class=\"socials\"><a id=\"login\" data-toggle=\"modal\" data-target=\"#login-user\">Login</a></li>\r\n            <li class=\"socials\"><a id=\"register\" data-toggle=\"modal\" data-target=\"#register-user\">Register</a></li>\r\n          </ul>\r\n        </li>\r\n    </ul>\r\n\r\n\r\n    \r\n\r\n    </div>\r\n  </div>\r\n</div> \r\n            \r\n\r\n\r\n<div id=\"register-user\" class=\"modal hide fade\">\r\n  <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n    <h3>Register here</h3>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n    <form method=\"POST\" action='register' id=\"signupForm\">\r\n      <fieldset>\r\n        <input type=\"text\" id=\"registerUser\" placeholder=\"Your login ID...\" name=\"registerUser\">     \r\n        <input type=\"password\" id=\"registerPassword\" placeholder=\"Password...\" name=\"registerPassword\"> \r\n      </fieldset>\r\n    </form>\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <input id=\"signup\" type=\"submit\" class=\"btn btn-primary\" value=\"Signup\"></input>\r\n  </div>\r\n</div>\r\n\r\n<div id=\"login-user\" class=\"modal hide fade\">\r\n  <div class=\"modal-header\">\r\n    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-hidden=\"true\">&times;</button>\r\n    <h3>Login</h3>\r\n  </div>\r\n  <div class=\"modal-body\">\r\n\r\n<div id=\"loginSuccsesAlert\" class=\"alert alert-success\" data-alert=\"alert\" target=\"#\">\r\n    <a class=\"close\" id=\"closeLoginSuccsesAlert\">x</a>\r\n <div id=\"successMessage\"></div>\r\n</div>\r\n\r\n<div id=\"loginErrorAlert\" class=\"alert alert-error\" data-alert=\"alert\" target=\"#\">\r\n    <a class=\"close\" id=\"closeLoginErrorAlert\">x</a>\r\n <div id=\"errorMessage\"></div>\r\n</div>\r\n\r\n    <form class=\"form-horizontal\" id=\"loginForm\">\r\n  <div class=\"control-group\">\r\n    <label class=\"control-label\" for=\"loginEmail\">Email</label>\r\n    <div class=\"controls\">\r\n      <input type=\"text\" id=\"loginEmail\" name=\"CustomerEmail\" placeholder=\"Email\">\r\n    </div>\r\n  </div>\r\n  <div class=\"control-group\">\r\n    <label class=\"control-label\" for=\"loginPassword\">Password</label>\r\n    <div class=\"controls\">\r\n      <input type=\"password\" id=\"loginPassword\" name=\"CustomerPassword\" placeholder=\"Password\">\r\n    </div>\r\n  </div>\r\n  <div class=\"control-group\">\r\n    <div class=\"controls\">\r\n      <label class=\"checkbox\">\r\n        <input type=\"checkbox\"> Remember me\r\n      </label>\r\n    \r\n    </div>\r\n  </div>\r\n</form>\r\n  </div>\r\n  <div class=\"modal-footer\">\r\n    <div class=\"row\" id=\"spin\"></div>\r\n    <input id=\"Signin\" type=\"submit\" class=\"btn btn-primary\" value=\"Sign in\"></input>\r\n  </div>\r\n</div>\r\n\r\n\r\n";});
});
window.require.register("views/templates/prices/prices", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"presenter\">\r\n\r\n<h1>Prices</h1>\r\n\r\n   <table class=\"table table-striped table-bordered table-hover\">\r\n            <tbody>\r\n                <tr>\r\n                    <th scope=\"col\">\r\n                        <div align=\"center\">\r\n                            Service\r\n                        </div>\r\n                    </th>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            Includes</div>\r\n                    </th>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            Cost</div>\r\n                    </th>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"1\" name=\"1\"></a>Remote Assistance </br> <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            -Remotely taking control of your computer to sort your problem there and then</div>\r\n                    </td>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            £10.00</div>\r\n                    </th>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"2\" name=\"2\"></a>PC Health Check </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            -Diagnose any hardware problems - Diagnose any blue screen problems\r\n                        </div>\r\n                    </td>\r\n                    <th scope=\"col\" >\r\n                        <div align=\"center\">\r\n                            £20.00</div>\r\n                    </th>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"3\" name=\"3\"></a>Minor Fixes </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            -Restore computer to factory settings, no file backup - Simple fixes or tweaks that\r\n                            can't be fixed remotely - Upgrade memory\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            <strong>£30.00</strong></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"4\" name=\"4\"></a>Reformat &amp; Clear viruses </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            -All Viruses removed -Files backed up &amp; restored -Restore computer to factory\r\n                            settings\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            <strong>£40.00</strong></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"5\" name=\"5\"></a>Install new hardware </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            -Year warranty on all fitted parts - Upgrade hard drive space, graphics, cpu, repair\r\n                            laptop screens -New laptop keyboard (keyboard &amp; labour)\r\n                        </div>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            <strong>£40.00</strong></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"6\" name=\"6\"></a>Setup wireless network </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            -Secure your network and personal information.</div>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            <strong>£10.00 via remote £20.00 if call out required</strong></div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\" >\r\n                        <div align=\"center\">\r\n                            <a id=\"7\" name=\"7\"></a>Recover lost files </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <p align=\"center\">\r\n                            -Files scanned for viruses</p>\r\n                        <p align=\"center\">\r\n                            - Files burnt to Disc</p>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            <strong>£30.00 for 4Gig</strong> <strong>£50.00 for over 4Gig</strong>\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\">\r\n                        <div align=\"center\">\r\n                            <a id=\"8\" name=\"8\"></a>VHS or Camcorder to DVD </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td>\r\n                        <p align=\"center\">\r\n                            <span>If you have any old VHS or camcorder cassettes that you want converted to DVD\r\n                                format we can do this</span></p>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            <strong>£10.00</strong>\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            +£5 for 1 additional copy or\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            +£10 for 4 extra copies\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\">\r\n                        <div align=\"center\">\r\n                            <a id=\"10\" name=\"10\"></a>Xbox 360 Repairs </br>  <a href=\"#top\">top</a>\r\n                        </div>\r\n                    </th>\r\n                    <td >\r\n                        <p align=\"center\">                       \r\n                            <strong>Prices include\r\n                                parts &amp; labour</strong></p>\r\n                  \r\n                        <p align=\"center\">\r\n                            Replacement DVD Drive</p>\r\n                        &nbsp;\r\n                        <p align=\"center\">\r\n                            Warranty – 1 Month\r\n                        Repair time – 1 – 3 days depending on parts available</p>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                        &nbsp;\r\n                        <div align=\"center\">\r\n                            <strong>£60.00</strong>\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n                <tr>\r\n                    <th scope=\"row\">\r\n                        <div align=\"center\">\r\n                            Other Jobs </br>  <a href=\"#top\">top</a></div>\r\n                    </th>\r\n                    <td>\r\n                        <p align=\"center\">\r\n                            <span>We meet new problems and challenges every day, we are open to suggestions and\r\n                                are happy to help with any issue.</span></p>\r\n                    </td>\r\n                    <td>\r\n                        <div align=\"center\">\r\n                            &nbsp;\r\n                        </div>\r\n                    </td>\r\n                </tr>\r\n            </tbody>\r\n        </table>\r\n</div>";});
});
window.require.register("views/templates/quote", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"presenter\">\r\n\r\n<h1>Quick Quote</h1>\r\n\r\n</div>";});
});
window.require.register("views/templates/site", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<header class=\"header-container\" id=\"header-container\"></header>\r\n\r\n<div class=\"container outer-container\">\r\n  <div class=\"page-container\" id=\"page-container\">\r\n  </div>\r\n</div>\r\n\r\n<footer class =\"footer-container\" id=\"footer-container\"></footer>";});
});
window.require.register("views/view-controllers/appointment/appointments-view", function(exports, require, module) {
  var AppointmentsView, Calendar, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/appointment/appointments');

  View = require('views/base/view');

  Calendar = components('calendar');

  module.exports = AppointmentsView = (function(_super) {

    __extends(AppointmentsView, _super);

    function AppointmentsView() {
      this.select = __bind(this.select, this);
      this.render = __bind(this.render, this);
      AppointmentsView.__super__.constructor.apply(this, arguments);
    }

    AppointmentsView.prototype.autoRender = true;

    AppointmentsView.prototype.className = 'appointments-page';

    AppointmentsView.prototype.container = '#page-container';

    AppointmentsView.prototype.template = template;

    AppointmentsView.prototype.render = function() {
      var calendar;
      this.$el.hide();
      AppointmentsView.__super__.render.apply(this, arguments);
      calendar = new Calendar();
      calendar.el.appendTo(this.$('#calendarView'));
      calendar.on('change', this.select);
      return this.$el.fadeIn();
    };

    AppointmentsView.prototype.select = function(dateOrEvent) {
      if ($(dateOrEvent.currentTarget).text() !== "Next") {
        if (dateOrEvent.getTime) {
          return this.set(dateOrEvent);
        } else {
          return this.set(new Date(dateString));
        }
      }
    };

    return AppointmentsView;

  })(View);
  
});
window.require.register("views/view-controllers/contact/contact-view", function(exports, require, module) {
  var ContactView, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/contact/contact');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = ContactView = (function(_super) {
    var showErrorAlert, showSuccessAlert, validate, validateEmail, validatePhone,
      _this = this;

    __extends(ContactView, _super);

    function ContactView() {
      this.closeError = __bind(this.closeError, this);
      this.closeSuccess = __bind(this.closeSuccess, this);
      this.postMessage = __bind(this.postMessage, this);
      this.backPassage = __bind(this.backPassage, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      ContactView.__super__.constructor.apply(this, arguments);
    }

    ContactView.prototype.autoRender = true;

    ContactView.prototype.className = 'contact-page';

    ContactView.prototype.container = '#page-container';

    ContactView.prototype.template = template;

    ContactView.prototype.initialize = function() {
      ContactView.__super__.initialize.apply(this, arguments);
      this.delegate('click', '#submitContact', this.postMessage);
      this.delegate('click', '#closeSuccess', this.closeSuccess);
      return this.delegate('click', '#closeError', this.closeError);
    };

    ContactView.prototype.render = function() {
      this.$el.hide();
      ContactView.__super__.render.apply(this, arguments);
      this.$('#contactSuccess').hide();
      this.$('#contactError').hide();
      return this.$el.fadeIn();
    };

    ContactView.prototype.backPassage = function() {
      return console.log("egg");
    };

    ContactView.prototype.postMessage = function() {
      var valid;
      valid = validate();
      console.log("valid?  " + valid);
      if (valid) {
        $('#contactError').hide();
        showSuccessAlert("<p> <strong>Thank you for your message we will be in touch soon. </strong>Please check your junk mail just in case.</P>");
        return $.ajax({
          url: "/api/contact/create",
          type: "post",
          data: $('#ContactForm').serialize(),
          error: function() {
            $('#contactSuccess').hide();
            return showErrorAlert("<p> <strong>Oops somethign has gone wrong. </strong>Please contact us on 07519746777 and we can sort you out.</P>");
          }
        });
      }
    };

    ContactView.prototype.closeSuccess = function() {
      return this.$('#contactSuccess').hide();
    };

    ContactView.prototype.closeError = function() {
      return this.$('#contactError').hide();
    };

    showSuccessAlert = function(message) {
      $('#successMessage').html(message);
      return $('#contactSuccess').show();
    };

    showErrorAlert = function(message) {
      $('#errorMessage').html(message);
      return $('#contactError').show();
    };

    validate = function() {
      var contactEmail, contactMessage, contactName, contactSource, errors, isEmail, isPhone, valid;
      errors = [];
      contactName = $('#contactName').val();
      contactEmail = $('#contactEmail').val();
      contactMessage = $('#contactMessage').val();
      contactSource = $('#contactSource').val();
      isEmail = validateEmail(contactEmail);
      isPhone = validatePhone(contactEmail);
      console.log("IsEmail: " + isEmail);
      console.log("isPhone: " + isPhone);
      errors.push("<strong>Please fill out the following information: </strong><br>");
      if (contactName.length < 1) {
        errors.push("-Your Name <br>");
      }
      if (contactMessage.length < 1) {
        errors.push("-Your Query <br>");
      }
      if (contactSource === "--Please Select--") {
        errors.push("-How you heard of us <br>");
      }
      if (contactEmail.length < 1) {
        errors.push("-Your Email / Phone <br>");
      } else {
        valid = false;
        if (!isEmail && !isPhone) {
          errors.push("-Invalid Phone Number or Email Address <br>");
          valid = true;
        } else if (isEmail) {
          valid = true;
        } else if (isPhone) {
          valid = true;
        }
        if (!valid) {
          errors.push("-Invalid Phone Number or Email Address <br>");
        }
      }
      if (errors.length > 1) {
        showErrorAlert(errors);
        return false;
      } else {
        return true;
      }
    };

    validateEmail = function(email) {
      var re;
      re = /\S+@\S+\.\S+/;
      return re.test(email);
    };

    validatePhone = function(number) {
      var re;
      re = /\d{11}/;
      return re.test(number);
    };

    return ContactView;

  }).call(this, View);
  
});
window.require.register("views/view-controllers/home/carousel-view", function(exports, require, module) {
  var CarouselView, QuickQuoteView, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home/carousel');

  View = require('views/base/view');

  mediator = require('mediator');

  QuickQuoteView = require('./quickQuote-view');

  module.exports = CarouselView = (function(_super) {
    var showErrorAlert, validate, validatePostcode,
      _this = this;

    __extends(CarouselView, _super);

    function CarouselView() {
      this.closeLoginErrorAlert = __bind(this.closeLoginErrorAlert, this);
      this.postcodeSearch = __bind(this.postcodeSearch, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      CarouselView.__super__.constructor.apply(this, arguments);
    }

    CarouselView.prototype.autoRender = true;

    CarouselView.prototype.container = '#topRow';

    CarouselView.prototype.template = template;

    CarouselView.prototype.initialize = function() {
      CarouselView.__super__.initialize.apply(this, arguments);
      return this.delegate('keyup', '#postcodeBox', this.postcodeSearch);
    };

    CarouselView.prototype.render = function() {
      CarouselView.__super__.render.apply(this, arguments);
      this.closeLoginErrorAlert();
      return this.$('.carousel').carousel();
    };

    CarouselView.prototype.postcodeSearch = function(e) {
      var postcode;
      if (e.keyCode === 13) {
        postcode = $('#postcodeBox').val();
        if (validate(postcode)) {
          this.$el.fadeOut();
          new QuickQuoteView();
          mediator.publish("quickQuoteView", postcode);
          return this.dispose;
        }
      }
    };

    validate = function(postcode) {
      var errors;
      errors = [];
      if (postcode.length < 1 || !validatePostcode(postcode)) {
        errors.push("Please use a valid postcode");
      }
      if (errors.length > 0) {
        showErrorAlert(errors);
        return false;
      } else {
        return true;
      }
    };

    CarouselView.prototype.closeLoginErrorAlert = function() {
      return this.$('#validPostcode').hide();
    };

    showErrorAlert = function(message) {
      $('#postcodeResult').html(message);
      return $('#validPostcode').show();
    };

    validatePostcode = function(postcode) {
      var belfastPostcode, postcodeRegEx;
      console.log(postcode);
      postcodeRegEx = /^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z])))) {0,1}[0-9][A-Za-z]{2})$/;
      belfastPostcode = /^([Bb][Tt])/;
      if (belfastPostcode.test(postcode)) {
        return postcodeRegEx.test(postcode);
      } else {
        return false;
      }
    };

    return CarouselView;

  }).call(this, View);
  
});
window.require.register("views/view-controllers/home/home-page-view", function(exports, require, module) {
  var CarouselView, HomePageView, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home/home');

  View = require('views/base/view');

  mediator = require('mediator');

  CarouselView = require('./carousel-view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.container = '#page-container';

    HomePageView.prototype.template = template;

    HomePageView.prototype.initialize = function() {
      return HomePageView.__super__.initialize.apply(this, arguments);
    };

    HomePageView.prototype.render = function() {
      this.$el.hide();
      HomePageView.__super__.render.apply(this, arguments);
      new CarouselView({
        container: this.$("#topRow")
      });
      return this.$el.fadeIn();
    };

    return HomePageView;

  })(View);
  
});
window.require.register("views/view-controllers/home/inbound-view", function(exports, require, module) {
  var InboundView, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home/inbound');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = InboundView = (function(_super) {

    __extends(InboundView, _super);

    function InboundView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      InboundView.__super__.constructor.apply(this, arguments);
    }

    InboundView.prototype.autoRender = true;

    InboundView.prototype.container = '#topRow';

    InboundView.prototype.template = template;

    InboundView.prototype.initialize = function() {
      return InboundView.__super__.initialize.apply(this, arguments);
    };

    InboundView.prototype.render = function() {
      return InboundView.__super__.render.apply(this, arguments);
    };

    return InboundView;

  })(View);
  
});
window.require.register("views/view-controllers/home/outbound-view", function(exports, require, module) {
  var OutboundView, View, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home/outbound');

  View = require('views/base/view');

  mediator = require('mediator');

  module.exports = OutboundView = (function(_super) {

    __extends(OutboundView, _super);

    function OutboundView() {
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      OutboundView.__super__.constructor.apply(this, arguments);
    }

    OutboundView.prototype.autoRender = true;

    OutboundView.prototype.container = '#topRow';

    OutboundView.prototype.template = template;

    OutboundView.prototype.initialize = function() {
      return OutboundView.__super__.initialize.apply(this, arguments);
    };

    OutboundView.prototype.render = function() {
      return OutboundView.__super__.render.apply(this, arguments);
    };

    return OutboundView;

  })(View);
  
});
window.require.register("views/view-controllers/home/quickQuote-view", function(exports, require, module) {
  var InboundView, OutboundView, QuickQuoteView, Spinner, View, denzel, mediator, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home/quickQuote');

  View = require('views/base/view');

  mediator = require('mediator');

  Spinner = components('spin.js');

  InboundView = require('views/view-controllers/home/inbound-view');

  OutboundView = require('views/view-controllers/home/outbound-view');

  denzel = new Spinner({
    color: '#e5e5e5',
    lines: 13,
    className: 'spinner',
    length: 20,
    width: 10,
    radius: 30,
    corners: 1.0,
    rotate: 0,
    trail: 60,
    speed: 1.0,
    direction: 1,
    shadow: false
  }).spin();

  module.exports = QuickQuoteView = (function(_super) {
    var inBounds, outOfBounds, showErrorAlert,
      _this = this;

    __extends(QuickQuoteView, _super);

    function QuickQuoteView() {
      this.closeLoginErrorAlert = __bind(this.closeLoginErrorAlert, this);
      this.postcodeSearch = __bind(this.postcodeSearch, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      QuickQuoteView.__super__.constructor.apply(this, arguments);
    }

    QuickQuoteView.prototype.autoRender = true;

    QuickQuoteView.prototype.container = '#topRow';

    QuickQuoteView.prototype.template = template;

    QuickQuoteView.prototype.initialize = function() {
      QuickQuoteView.__super__.initialize.apply(this, arguments);
      return mediator.subscribe("quickQuoteView", this.postcodeSearch);
    };

    QuickQuoteView.prototype.render = function() {
      return QuickQuoteView.__super__.render.apply(this, arguments);
    };

    QuickQuoteView.prototype.postcodeSearch = function(item) {
      this.$('#spinner').append(denzel.el);
      console.log(item);
      this.closeLoginErrorAlert();
      return $.ajax({
        url: "/api/postcode",
        type: "post",
        data: {
          postcode: item
        },
        statusCode: {
          422: function() {
            return outOfBounds(item);
          },
          200: function() {
            return inBounds(item);
          },
          502: function() {
            return showErrorAlert("<strong>Whoops - Something has gone wrong</strong> Please try again.");
          }
        },
        success: function(jqXhr, textStatus) {
          return console.log(jqXhr);
        },
        error: function(jqXhr, textStatus, errorThrown) {
          return console.log(errorThrown);
        },
        complete: function() {
          return denzel.stop();
        }
      });
    };

    outOfBounds = function(postcode) {
      new OutboundView({
        container: QuickQuoteView.$("#topRow")
      });
      console.log("out of bounds " + postcode);
      return QuickQuoteView.dispose;
    };

    inBounds = function(postcode) {
      new InboundView({
        container: QuickQuoteView.$("#topRow")
      });
      console.log("in bounds " + postcode);
      return QuickQuoteView.dispose;
    };

    QuickQuoteView.prototype.closeLoginErrorAlert = function() {
      return this.$('#validPostcode').hide();
    };

    showErrorAlert = function(message) {
      $('#postcodeResult').html(message);
      return $('#validPostcode').show();
    };

    return QuickQuoteView;

  }).call(this, View);
  
});
window.require.register("views/view-controllers/page/footer-view", function(exports, require, module) {
  var FooterView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/page/footer');

  module.exports = FooterView = (function(_super) {

    __extends(FooterView, _super);

    function FooterView() {
      FooterView.__super__.constructor.apply(this, arguments);
    }

    FooterView.prototype.autoRender = true;

    FooterView.prototype.className = 'footer';

    FooterView.prototype.region = 'footer';

    FooterView.prototype.id = 'footer';

    FooterView.prototype.template = template;

    return FooterView;

  })(View);
  
});
window.require.register("views/view-controllers/page/header-view", function(exports, require, module) {
  var HeaderView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/page/header');

  module.exports = HeaderView = (function(_super) {
    var showErrorAlert, showSuccessAlert, validate,
      _this = this;

    __extends(HeaderView, _super);

    function HeaderView() {
      this.closeLoginErrorAlert = __bind(this.closeLoginErrorAlert, this);
      this.closeLoginSuccsesAlert = __bind(this.closeLoginSuccsesAlert, this);
      this.doLogin = __bind(this.doLogin, this);
      this.render = __bind(this.render, this);
      this.initialize = __bind(this.initialize, this);
      HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.region = 'header';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    HeaderView.prototype.initialize = function() {
      HeaderView.__super__.initialize.apply(this, arguments);
      this.delegate('click', "#Signin", this.doLogin);
      this.delegate('click', '#closeLoginSuccsesAlert', this.closeLoginSuccsesAlert);
      return this.delegate('click', '#closeLoginErrorAlert', this.closeLoginErrorAlert);
    };

    HeaderView.prototype.render = function() {
      HeaderView.__super__.render.apply(this, arguments);
      this.$('#loginSuccsesAlert').hide();
      return this.$('#loginErrorAlert').hide();
    };

    HeaderView.prototype.doLogin = function() {
      if (validate()) {
        return $.ajax({
          url: "/api/customer/login",
          type: "post",
          data: $('#loginForm').serialize(),
          success: function(e) {
            return console.log(e);
          },
          statusCode: {
            401: function() {
              return showErrorAlert("Incorrect Login or Password");
            },
            502: function() {
              return showErrorAlert("<strong>Whoops - Something has gone wrong</strong> Please try again.");
            }
          },
          error: function(xhr, err, status) {
            $('#loginSuccsesAlert').hide();
            return showErrorAlert("<strong>Whoops - Somethings gone wrong.</strong> You can give us a call on 07519746777 or drop us a mail at doctor@drpcni.com");
          }
        });
      }
    };

    validate = function() {
      var errors, loginEmail, loginPassword;
      errors = [];
      loginEmail = $('#loginEmail').val();
      loginPassword = $('#loginPassword').val();
      errors.push("<strong>Please fill out the following information: </strong><br>");
      if (loginEmail.length < 1) {
        errors.push("-Your Email <br>");
      }
      if (loginPassword.length < 1) {
        errors.push("-Your Password <br>");
      }
      if (errors.length > 1) {
        showErrorAlert(errors);
        return false;
      } else {
        return true;
      }
    };

    HeaderView.prototype.closeLoginSuccsesAlert = function() {
      return this.$('#loginSuccsesAlert').hide();
    };

    HeaderView.prototype.closeLoginErrorAlert = function() {
      return this.$('#loginErrorAlert').hide();
    };

    showSuccessAlert = function(message) {
      $('#successMessage').html(message);
      return $('#loginSuccsesAlert').show();
    };

    showErrorAlert = function(message) {
      $('#errorMessage').html(message);
      return $('#loginErrorAlert').show();
    };

    return HeaderView;

  }).call(this, View);
  
});
window.require.register("views/view-controllers/prices/prices-view", function(exports, require, module) {
  var PricesView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/prices/prices');

  View = require('views/base/view');

  module.exports = PricesView = (function(_super) {

    __extends(PricesView, _super);

    function PricesView() {
      this.render = __bind(this.render, this);
      PricesView.__super__.constructor.apply(this, arguments);
    }

    PricesView.prototype.autoRender = true;

    PricesView.prototype.className = 'prices-page';

    PricesView.prototype.container = '#page-container';

    PricesView.prototype.template = template;

    PricesView.prototype.render = function() {
      this.$el.hide();
      PricesView.__super__.render.apply(this, arguments);
      return this.$el.fadeIn();
    };

    return PricesView;

  })(View);
  
});
