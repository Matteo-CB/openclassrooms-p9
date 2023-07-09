(function (g) {
  (g.fn.mauGallery = function (a) {
    var a = g.extend(g.fn.mauGallery.defaults, a),
      e = [];
    return this.each(function () {
      g.fn.mauGallery.methods.createRowWrapper(g(this)),
        a.lightBox &&
          g.fn.mauGallery.methods.createLightBox(
            g(this),
            a.lightboxId,
            a.navigation
          ),
        g.fn.mauGallery.listeners(a),
        g(this)
          .children(".gallery-item")
          .each(function () {
            g.fn.mauGallery.methods.responsiveImageItem(g(this)),
              g.fn.mauGallery.methods.moveItemInRowWrapper(g(this)),
              g.fn.mauGallery.methods.wrapItemInColumn(g(this), a.columns);
            var b = g(this).data("gallery-tag");
            a.showTags && void 0 !== b && -1 === e.indexOf(b) && e.push(b);
          }),
        a.showTags &&
          g.fn.mauGallery.methods.showItemTags(g(this), a.tagsPosition, e),
        g(this).fadeIn(500);
    });
  }),
    (g.fn.mauGallery.defaults = {
      columns: 3,
      lightBox: !0,
      lightboxId: null,
      showTags: !0,
      tagsPosition: "bottom",
      navigation: !0,
    }),
    (g.fn.mauGallery.listeners = function (a) {
      g(".gallery-item").on("click", function () {
        a.lightBox &&
          "IMG" === g(this).prop("tagName") &&
          g.fn.mauGallery.methods.openLightBox(g(this), a.lightboxId);
      }),
        g(".gallery").on(
          "click",
          ".nav-link",
          g.fn.mauGallery.methods.filterByTag
        ),
        g(".gallery").on("click", ".mg-prev", () =>
          g.fn.mauGallery.methods.prevImage(a.lightboxId)
        ),
        g(".gallery").on("click", ".mg-next", () =>
          g.fn.mauGallery.methods.nextImage(a.lightboxId)
        );
    }),
    (g.fn.mauGallery.methods = {
      createRowWrapper(b) {
        b.children().first().hasClass("row") ||
          b.append('<div class="gallery-items-row row"></div>');
      },
      wrapItemInColumn(d, a) {
        if (a.constructor === Number)
          d.wrap(
            `<div class='item-column mb-4 col-${Math.ceil(12 / a)}'></div>`
          );
        else if (a.constructor === Object) {
          var b = "";
          a.xs && (b += ` col-${Math.ceil(12 / a.xs)}`),
            a.sm && (b += ` col-sm-${Math.ceil(12 / a.sm)}`),
            a.md && (b += ` col-md-${Math.ceil(12 / a.md)}`),
            a.lg && (b += ` col-lg-${Math.ceil(12 / a.lg)}`),
            a.xl && (b += ` col-xl-${Math.ceil(12 / a.xl)}`),
            d.wrap(`<div class='item-column mb-4${b}'></div>`);
        } else
          console.error(
            `Columns should be defined as numbers or objects. ${typeof a} is not supported.`
          );
      },
      moveItemInRowWrapper(b) {
        b.appendTo(".gallery-items-row");
      },
      responsiveImageItem(b) {
        "IMG" === b.prop("tagName") && b.addClass("img-fluid");
      },
      openLightBox(a, b) {
        g(`#${b}`).find(".lightboxImage").attr("src", a.attr("src")),
          g(`#${b}`).modal("toggle");
      },
      prevImage() {
        let a = null;
        g("img.gallery-item").each(function () {
          g(this).attr("src") === g(".lightboxImage").attr("src") &&
            (a = g(this));
        });
        let h = g(".tags-bar span.active-tag").data("images-toggle"),
          c = [];
        "all" === h
          ? g(".item-column").each(function () {
              g(this).children("img").length && c.push(g(this).children("img"));
            })
          : g(".item-column").each(function () {
              g(this).children("img").data("gallery-tag") === h &&
                c.push(g(this).children("img"));
            });
        let d = 0,
          i = null;
        g(c).each(function (b) {
          g(a).attr("src") === g(this).attr("src") && (d = b - 1);
        }),
          (i = c[d] || c[c.length - 1]),
          g(".lightboxImage").attr("src", g(i).attr("src"));
      },
      nextImage() {
        let a = null;
        g("img.gallery-item").each(function () {
          g(this).attr("src") === g(".lightboxImage").attr("src") &&
            (a = g(this));
        });
        let h = g(".tags-bar span.active-tag").data("images-toggle"),
          c = [];
        "all" === h
          ? g(".item-column").each(function () {
              g(this).children("img").length && c.push(g(this).children("img"));
            })
          : g(".item-column").each(function () {
              g(this).children("img").data("gallery-tag") === h &&
                c.push(g(this).children("img"));
            });
        let d = 0,
          i = null;
        g(c).each(function (b) {
          g(a).attr("src") === g(this).attr("src") && (d = b + 1);
        }),
          (i = c[d] || c[0]),
          g(".lightboxImage").attr("src", g(i).attr("src"));
      },
      createLightBox(d, a, b) {
        d.append(`<div class="modal fade" id="${
          a ? a : "galleryLightbox"
        }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            ${
                              b
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            ${
                              b
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
      },
      showItemTags(a, b, c) {
        var d =
          '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
        g.each(c, function (c, a) {
          d += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="${a}">${a}</span></li>`;
        });
        var h = `<ul class="my-4 tags-bar nav nav-pills">${d}</ul>`;
        "bottom" === b
          ? a.append(h)
          : "top" === b
          ? a.prepend(h)
          : console.error(`Unknown tags position: ${b}`);
      },
      filterByTag() {
        if (!g(this).hasClass("active-tag")) {
          g(".active.active-tag").removeClass("active active-tag"),
            g(this).addClass("active-tag active");
          var a = g(this).data("images-toggle");
          g(".gallery-item").each(function () {
            g(this).parents(".item-column").hide(),
              "all" === a
                ? g(this).parents(".item-column").show(300)
                : g(this).data("gallery-tag") === a &&
                  g(this).parents(".item-column").show(300);
          });
        }
      },
    });
})(jQuery);
