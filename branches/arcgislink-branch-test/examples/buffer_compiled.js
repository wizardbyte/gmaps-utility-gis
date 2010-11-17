(function(){/*
 http://google-maps-utility-library-v3.googlecode.com
*/
var g = Math.PI / 180, i = 0;
window.ags_jsonp = window.ags_jsonp || {};
var l = google.maps, m, n, o, p = {G:null, C:false}, q = {}, r = {};
function s(a, b, c) {
  var d = b === "" ? 0 : a.indexOf(b);
  return a.substring(d + b.length, c === "" ? a.length : a.indexOf(c, d + b.length))
}
function t(a, b, c) {
  if(a && b) {
    var d;
    for(d in a) {
      if(c || !(d in b)) {
        b[d] = a[d]
      }
    }
  }
  return b
}
function u() {
  l.event.trigger.apply(this, arguments)
}
function aa() {
  if(typeof XMLHttpRequest === "undefined") {
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
    }catch(a) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
    }catch(b) {
    }
    try {
      return new ActiveXObject("Msxml2.XMLHTTP")
    }catch(c) {
    }
    throw new Error("This browser does not support XMLHttpRequest.");
  }else {
    return new XMLHttpRequest
  }
}
var v = "esriGeometryPoint", w = "esriGeometryMultipoint", x = "esriGeometryPolyline", y = "esriGeometryPolygon", A = "esriGeometryEnvelope";
function B(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker) {
    return a && a.splice && a.length > 1 ? w : v
  }else {
    if(b instanceof l.Polyline) {
      return x
    }else {
      if(b instanceof l.Polygon) {
        return y
      }else {
        if(b instanceof l.LatLngBounds) {
          return A
        }else {
          if(b.x !== undefined && b.y !== undefined) {
            return v
          }else {
            if(b.points) {
              return w
            }else {
              if(b.paths) {
                return x
              }else {
                if(b.rings) {
                  return y
                }
              }
            }
          }
        }
      }
    }
  }
  return null
}
function C(a) {
  var b = a;
  if(a && a.splice && a.length > 0) {
    b = a[0]
  }
  if(b && b.splice && b.length > 0) {
    b = b[0]
  }
  if(b instanceof l.LatLng || b instanceof l.Marker || b instanceof l.Polyline || b instanceof l.Polygon || b instanceof l.LatLngBounds) {
    return true
  }
  return false
}
function D(a) {
  if(!a) {
    return null
  }
  return typeof a === "number" ? a : a.wkid ? a.wkid : a.toJSON()
}
function E(a, b) {
  for(var c = [], d, e = 0, f = a.getLength();e < f;e++) {
    d = a.getAt(e);
    c.push("[" + d.lng() + "," + d.lat() + "]")
  }
  b && c.length > 0 && c.push("[" + a.getAt(0).lng() + "," + a.getAt(0).lat() + "]");
  return c.join(",")
}
function F(a) {
  var b, c, d, e = "{";
  switch(B(a)) {
    case v:
      b = a && a.splice ? a[0] : a;
      if(b instanceof l.Marker) {
        b = b.getPosition()
      }
      e += "x:" + b.lng() + ",y:" + b.lat();
      break;
    case w:
      d = [];
      for(c = 0;c < a.length;c++) {
        b = a[c] instanceof l.Marker ? a[c].getPosition() : a[c];
        d.push("[" + b.lng() + "," + b.lat() + "]")
      }
      e += "points: [" + d.join(",") + "]";
      break;
    case x:
      d = [];
      a = a && a.splice ? a : [a];
      for(c = 0;c < a.length;c++) {
        d.push("[" + E(a[c].getPath()) + "]")
      }
      e += "paths:[" + d.join(",") + "]";
      break;
    case y:
      d = [];
      b = a && a.splice ? a[0] : a;
      a = b.getPaths();
      for(c = 0;c < a.getLength();c++) {
        d.push("[" + E(a.getAt(c), true) + "]")
      }
      e += "rings:[" + d.join(",") + "]";
      break;
    case A:
      b = a && a.splice ? a[0] : a;
      e += "xmin:" + b.getSouthWest().lng() + ",ymin:" + b.getSouthWest().lat() + ",xmax:" + b.getNorthEast().lng() + ",ymax:" + b.getNorthEast().lat();
      break
  }
  e += ", spatialReference:{wkid:4326}";
  e += "}";
  return e
}
function ba(a) {
  function b(e) {
    for(var f = [], h = 0, j = e.length;h < j;h++) {
      f.push("[" + e[h][0] + "," + e[h][1] + "]")
    }
    return"[" + f.join(",") + "]"
  }
  function c(e) {
    for(var f = [], h = 0, j = e.length;h < j;h++) {
      f.push(b(e[h]))
    }
    return"[" + f.join(",") + "]"
  }
  var d = "{";
  if(a.x) {
    d += "x:" + a.x + ",y:" + a.y
  }else {
    if(a.xmin) {
      d += "xmin:" + a.xmin + ",ymin:" + a.ymin + ",xmax:" + a.xmax + ",ymax:" + a.ymax
    }else {
      if(a.points) {
        d += "points:" + b(a.points)
      }else {
        if(a.paths) {
          d += "paths:" + c(a.paths)
        }else {
          if(a.rings) {
            d += "rings:" + c(a.rings)
          }
        }
      }
    }
  }
  d += "}";
  return d
}
function ca(a, b) {
  var c = null, d, e, f, h, j, k, N, z;
  b = b || {};
  if(a) {
    c = [];
    if(a.x) {
      d = new l.Marker(t(b.markerOptions || b, {position:new l.LatLng(a.y, a.x)}));
      c.push(d)
    }else {
      j = a.points || a.paths || a.rings;
      if(!j) {
        return c
      }
      var X = [];
      e = 0;
      for(f = j.length;e < f;e++) {
        k = j[e];
        if(a.points) {
          d = new l.Marker(t(b.markerOptions || b, {position:new l.LatLng(k[1], k[0])}));
          c.push(d)
        }else {
          z = [];
          d = 0;
          for(h = k.length;d < h;d++) {
            N = k[d];
            z.push(new l.LatLng(N[1], N[0]))
          }
          if(a.paths) {
            d = new l.Polyline(t(b.polylineOptions || b, {path:z}));
            c.push(d)
          }else {
            a.rings && X.push(z)
          }
        }
      }
      if(a.rings) {
        d = new l.Polygon(t(b.P || b, {paths:X}));
        c.push(d)
      }
    }
  }
  return c
}
function G(a) {
  var b;
  if(typeof a === "object") {
    if(a && a.splice) {
      b = [];
      for(var c = 0, d = a.length;c < d;c++) {
        b.push(G(a[c]))
      }
      return"[" + b.join(",") + "]"
    }else {
      if(C(a)) {
        return F(a)
      }else {
        if(a.toJSON) {
          return a.toJSON()
        }else {
          b = "";
          for(c in a) {
            if(a.hasOwnProperty(c)) {
              if(b.length > 0) {
                b += ", "
              }
              b += c + ":" + G(a[c])
            }
          }
          return"{" + b + "}"
        }
      }
    }
  }
  return a.toString()
}
function da(a) {
  var b = {};
  if(!a) {
    return null
  }
  var c = [], d, e;
  if(a.geometries && a.geometries.length > 0) {
    d = a.geometries[0];
    e = C(d);
    for(var f = 0, h = a.geometries.length;f < h;f++) {
      e ? c.push(F(a.geometries[f])) : c.push(ba(a.geometries[f]))
    }
  }
  if(!a.geometryType) {
    a.geometryType = B(d)
  }
  if(e) {
    b.inSR = m.wkid
  }else {
    if(a.inSpatialReference) {
      b.inSR = D(a.inSpatialReference)
    }
  }
  if(a.outSpatialReference) {
    b.outSR = D(a.outSpatialReference)
  }
  b.geometries = '{geometryType:"' + a.geometryType + '", geometries:[' + c.join(",") + "]}";
  return b
}
function ea(a) {
  var b = "";
  if(a) {
    a.f = a.f || "json";
    for(var c in a) {
      if(a.hasOwnProperty(c) && a[c] !== null && a[c] !== undefined) {
        var d = G(a[c]);
        b += c + "=" + (escape ? escape(d) : encodeURIComponent(d)) + "&"
      }
    }
  }
  return b
}
function H(a, b, c, d) {
  var e = "ags_jsonp_" + i++ + "_" + Math.floor(Math.random() * 1E6), f = null;
  b = b || {};
  b[c || "callback"] = "ags_jsonp." + e + " && ags_jsonp." + e;
  b = ea(b);
  var h = document.getElementsByTagName("head")[0];
  if(!h) {
    throw new Error("document must have header tag");
  }
  window.ags_jsonp[e] = function() {
    window.ags_jsonp[e] && delete window.ags_jsonp[e];
    f && h.removeChild(f);
    f = null;
    d.apply(null, arguments);
    u(r, "jsonpend", e)
  };
  if((b + a).length < 2E3 && !p.C) {
    f = document.createElement("script");
    f.src = a + (a.indexOf("?") === -1 ? "?" : "&") + b;
    f.id = e;
    h.appendChild(f)
  }else {
    c = window.location;
    c = c.protocol + "//" + c.hostname + (!c.port || c.port === 80 ? "" : ":" + c.port + "/");
    var j = true;
    if(a.toLowerCase().indexOf(c.toLowerCase()) !== -1) {
      j = false
    }
    if(p.C) {
      j = true
    }
    if(j && !p.G) {
      throw new Error("No proxyUrl property in Config is defined");
    }
    var k = aa();
    k.onreadystatechange = function() {
      if(k.readyState === 4) {
        if(k.status === 200) {
          eval(k.responseText)
        }else {
          throw new Error("Error code " + k.status);
        }
      }
    };
    k.open("POST", j ? p.G + "?" + a : a, true);
    k.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    k.send(b)
  }
  u(r, "jsonpstart", e);
  return e
}
r.O = function(a, b, c, d) {
  H(a, b, c, d)
};
r.B = function(a, b) {
  if(b && b.splice) {
    for(var c, d = 0, e = b.length;d < e;d++) {
      if((c = b[d]) && c.splice) {
        r.B(a, c)
      }else {
        C(c) && c.setMap(a)
      }
    }
  }
};
r.R = function(a, b) {
  r.B(null, a);
  if(b) {
    a.length = 0
  }
};
function I(a) {
  a = a || {};
  this.wkid = a.wkid;
  this.wkt = a.wkt
}
I.prototype.forward = function(a) {
  return a
};
I.prototype.i = function() {
  return 360
};
I.prototype.toJSON = function() {
  return"{" + (this.wkid ? " wkid:" + this.wkid : "wkt: '" + this.wkt + "'") + "}"
};
function J(a) {
  a = a || {};
  I.call(this, a)
}
J.prototype = new I;
function K(a) {
  a = a || {};
  I.call(this, a);
  var b = a.r, c = a.v * g, d = a.w * g, e = a.s * g;
  this.a = a.j / a.unit;
  this.g = a.h * g;
  this.k = a.p;
  this.l = a.q;
  a = 1 / b;
  b = 2 * a - a * a;
  this.c = Math.sqrt(b);
  a = this.d(c, b);
  b = this.d(d, b);
  e = L(this, e, this.c);
  c = L(this, c, this.c);
  d = L(this, d, this.c);
  this.b = Math.log(a / b) / Math.log(c / d);
  this.A = a / (this.b * Math.pow(c, this.b));
  this.t = this.m(this.a, this.A, e, this.b)
}
K.prototype = new I;
K.prototype.d = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function L(a, b, c) {
  a = c * Math.sin(b);
  return Math.tan(Math.PI / 4 - b / 2) / Math.pow((1 - a) / (1 + a), c / 2)
}
K.prototype.m = function(a, b, c, d) {
  return a * b * Math.pow(c, d)
};
K.prototype.forward = function(a) {
  var b = a[0] * g;
  a = this.m(this.a, this.A, L(this, a[1] * g, this.c), this.b);
  b = this.b * (b - this.g);
  return[this.k + a * Math.sin(b), this.l + this.t - a * Math.cos(b)]
};
K.prototype.i = function() {
  return Math.PI * 2 * this.a
};
function M(a) {
  a = a || {};
  I.call(this, a);
  this.a = a.j / a.unit;
  var b = a.r;
  this.F = a.N;
  var c = a.s * g;
  this.g = a.h * g;
  this.k = a.p;
  this.l = a.q;
  a = 1 / b;
  this.e = 2 * a - a * a;
  this.o = this.e * this.e;
  this.D = this.o * this.e;
  this.n = this.e / (1 - this.e);
  this.J = this.d(c, this.a, this.e, this.o, this.D)
}
M.prototype = new I;
M.prototype.d = function(a, b, c, d, e) {
  return b * ((1 - c / 4 - 3 * d / 64 - 5 * e / 256) * a - (3 * c / 8 + 3 * d / 32 + 45 * e / 1024) * Math.sin(2 * a) + (15 * d / 256 + 45 * e / 1024) * Math.sin(4 * a) - 35 * e / 3072 * Math.sin(6 * a))
};
M.prototype.forward = function(a) {
  var b = a[1] * g, c = a[0] * g;
  a = this.a / Math.sqrt(1 - this.e * Math.pow(Math.sin(b), 2));
  var d = Math.pow(Math.tan(b), 2), e = this.n * Math.pow(Math.cos(b), 2);
  c = (c - this.g) * Math.cos(b);
  var f = this.d(b, this.a, this.e, this.o, this.D);
  return[this.k + this.F * a * (c + (1 - d + e) * Math.pow(c, 3) / 6 + (5 - 18 * d + d * d + 72 * e - 58 * this.n) * Math.pow(c, 5) / 120), this.l + this.F * (f - this.J) + a * Math.tan(b) * (c * c / 2 + (5 - d + 9 * e + 4 * e * e) * Math.pow(c, 4) / 120 + (61 - 58 * d + d * d + 600 * e - 330 * this.n) * Math.pow(c, 6) / 720)]
};
M.prototype.i = function() {
  return Math.PI * 2 * this.a
};
function O(a) {
  a = a || {};
  I.call(this, a);
  this.a = (a.j || 6378137) / (a.unit || 1);
  this.g = (a.h || 0) * g
}
O.prototype = new I;
O.prototype.forward = function(a) {
  var b = a[1] * g;
  return[this.a * (a[0] * g - this.g), this.a / 2 * Math.log((1 + Math.sin(b)) / (1 - Math.sin(b)))]
};
O.prototype.i = function() {
  return Math.PI * 2 * this.a
};
function P(a) {
  a = a || {};
  I.call(this, a);
  var b = a.r, c = a.v * g, d = a.w * g, e = a.s * g;
  this.a = a.j / a.unit;
  this.g = a.h * g;
  this.k = a.p;
  this.l = a.q;
  a = 1 / b;
  b = 2 * a - a * a;
  this.c = Math.sqrt(b);
  a = this.d(c, b);
  b = this.d(d, b);
  c = Q(this, c, this.c);
  d = Q(this, d, this.c);
  e = Q(this, e, this.c);
  this.b = (a * a - b * b) / (d - c);
  this.z = a * a + this.b * c;
  this.t = this.m(this.a, this.z, this.b, e)
}
P.prototype = new I;
P.prototype.d = function(a, b) {
  var c = Math.sin(a);
  return Math.cos(a) / Math.sqrt(1 - b * c * c)
};
function Q(a, b, c) {
  a = c * Math.sin(b);
  return(1 - c * c) * (Math.sin(b) / (1 - a * a) - 1 / (2 * c) * Math.log((1 - a) / (1 + a)))
}
P.prototype.m = function(a, b, c, d) {
  return a * Math.sqrt(b - c * d) / c
};
P.prototype.forward = function(a) {
  var b = a[0] * g;
  a = this.m(this.a, this.z, this.b, Q(this, a[1] * g, this.c));
  b = this.b * (b - this.g);
  return[this.k + a * Math.sin(b), this.l + this.t - a * Math.cos(b)]
};
P.prototype.i = function() {
  return Math.PI * 2 * this.a
};
P.prototype.i = function() {
  return Math.PI * 2 * this.a
};
m = new J({wkid:4326});
n = new J({wkid:4269});
o = new O({wkid:102113, j:6378137, h:0, unit:1});
q = {"4326":m, "4269":n, "102113":o, "102100":new O({wkid:102100, j:6378137, h:0, unit:1})};
r.Q = function(a, b) {
  var c = q["" + a];
  if(c) {
    return c
  }
  if(b instanceof I) {
    c = q["" + a] = b
  }else {
    c = b || a;
    var d = {wkt:a};
    if(a === parseInt(a, 10)) {
      d = {wkid:a}
    }
    var e = s(c, 'PROJECTION["', '"]'), f = s(c, "SPHEROID[", "]").split(",");
    if(e !== "") {
      d.unit = parseFloat(s(s(c, "PROJECTION", ""), "UNIT[", "]").split(",")[1]);
      d.j = parseFloat(f[1]);
      d.r = parseFloat(f[2]);
      d.s = parseFloat(s(c, '"Latitude_Of_Origin",', "]"));
      d.h = parseFloat(s(c, '"Central_Meridian",', "]"));
      d.p = parseFloat(s(c, '"False_Easting",', "]"));
      d.q = parseFloat(s(c, '"False_Northing",', "]"))
    }
    switch(e) {
      case "":
        c = new I(d);
        break;
      case "Lambert_Conformal_Conic":
        d.v = parseFloat(s(c, '"Standard_Parallel_1",', "]"));
        d.w = parseFloat(s(c, '"Standard_Parallel_2",', "]"));
        c = new K(d);
        break;
      case "Transverse_Mercator":
        d.N = parseFloat(s(c, '"Scale_Factor",', "]"));
        c = new M(d);
        break;
      case "Albers":
        d.v = parseFloat(s(c, '"Standard_Parallel_1",', "]"));
        d.w = parseFloat(s(c, '"Standard_Parallel_2",', "]"));
        c = new P(d);
        break;
      default:
        throw new Error(e + "  not supported");
    }
    if(c) {
      q["" + a] = c
    }
  }
  return c
};
function fa(a) {
  this.url = a;
  this.S = "geocodeservice"
}
function ga(a, b, c, d) {
  var e = da(b);
  if(b.bufferSpatialReference) {
    e.bufferSR = D(b.bufferSpatialReference)
  }
  e.outSR = 4326;
  e.distances = b.distances.join(",");
  if(b.unit) {
    e.unit = b.unit
  }
  H(a.url + "/buffer", e, "callback", function(f) {
    var h = [];
    if(f.geometries) {
      for(var j = 0, k = f.geometries.length;j < k;j++) {
        h.push(ca(f.geometries[j], b.overlayOptions))
      }
    }
    f.geometries = h;
    c(f);
    d && f && f.error && d(f.error)
  })
}
function R(a) {
  this.K = a ? a.lods : null;
  this.u = a ? q[a.spatialReference.wkid || a.spatialReference.wkt] : o;
  if(!this.u) {
    throw new Error("unsupported Spatial Reference");
  }
  this.H = a ? a.lods[0].resolution : 156543.033928;
  this.minZoom = Math.floor(Math.log(this.u.i() / this.H / 256) / Math.LN2 + 0.5);
  this.maxZoom = a ? this.minZoom + this.K.length - 1 : 20;
  if(l.Size) {
    this.T = a ? new l.Size(a.cols, a.rows) : new l.Size(256, 256)
  }
  this.I = Math.pow(2, this.minZoom) * this.H;
  this.L = a ? a.origin.x : -2.0037508342787E7;
  this.M = a ? a.origin.y : 2.0037508342787E7;
  if(a) {
    for(var b, c = 0;c < a.lods.length - 1;c++) {
      b = a.lods[c].resolution / a.lods[c + 1].resolution;
      if(b > 2.001 || b < 1.999) {
        throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");
      }
    }
  }
}
R.prototype.fromLatLngToPoint = function(a, b) {
  if(!a || isNaN(a.lat()) || isNaN(a.lng())) {
    return null
  }
  var c = this.u.forward([a.lng(), a.lat()]), d = b || new l.Point(0, 0);
  d.x = (c[0] - this.L) / this.I;
  d.y = (this.M - c[1]) / this.I;
  return d
};
R.prototype.fromLatLngToPoint = R.prototype.fromLatLngToPoint;
new R;
new l.OverlayView;var S, T, U, V, W = [], Y = [], Z = new google.maps.MVCArray;
function ha(a) {
  if(U) {
    U.close();
    U = null
  }
  Z.insertAt(Z.length, a.latLng);
  var b = new google.maps.Marker({position:a.latLng, map:S, draggable:true});
  W.push(b);
  b.setTitle("#" + Z.length);
  google.maps.event.addListener(b, "click", function() {
    b.setMap(null);
    for(var c = 0, d = W.length;c < d;c++) {
      if(W[c] == b) {
        W.splice(c, 1);
        Z.removeAt(c);
        break
      }
    }
    $()
  });
  google.maps.event.addListener(b, "dragend", function() {
    for(var c = 0, d = W.length;c < d;c++) {
      if(W[c] == b) {
        Z.setAt(c, b.getPosition());
        break
      }
    }
    $()
  });
  $()
}
function $() {
  if(W.length > 2) {
    for(var a = 0;a < Y.length;a++) {
      Y[a].setMap(null)
    }
    Y.length = 0;
    ga(T, {geometries:[V], bufferSpatialReference:102113, distances:[500, 1E3], unit:9001, unionResults:true, overlayOptions:{clickable:false}}, function(b, c) {
      if(c) {
        alert(c.message + c.details.join(","))
      }else {
        for(var d, e = 0, f = b.geometries.length;e < f;e++) {
          for(var h = 0, j = b.geometries[e].length;h < j;h++) {
            d = b.geometries[e][h];
            d.setMap(S);
            Y.push(d)
          }
        }
      }
    })
  }
}
window.onload = function() {
  var a = {zoom:15, center:new google.maps.LatLng(35.23, -80.84), mapTypeId:google.maps.MapTypeId.ROADMAP, mapTypeControlOptions:{mapTypeIds:[google.maps.MapTypeId.ROADMAP]}};
  S = new google.maps.Map(document.getElementById("map_canvas"), a);
  V = new google.maps.Polygon({strokeWeight:3, fillColor:"#5555FF"});
  V.setMap(S);
  V.setPaths(new google.maps.MVCArray([Z]));
  google.maps.event.addListener(S, "click", ha);
  T = new fa("http://sampleserver3.arcgisonline.com/arcgis/rest/services/Geometry/GeometryServer");
  U = new google.maps.InfoWindow({maxWidth:250, content:'Draw polygon by:<ul><li>Click map to add a Vertex<li>Drag marker to adjust<li>Click marker to delete vertex</ul><!--center><button onclick="closeWin()">OK</button></center--\>', position:S.getCenter()});
  U.open(S)
};
window.closeWin = function() {
  U && U.close()
};})()
