!function(n){n.fn.mauGallery=function(t){var t=n.extend(n.fn.mauGallery.defaults,t),e=[];return this.each(function(){n.fn.mauGallery.methods.createRowWrapper(n(this)),t.lightBox&&n.fn.mauGallery.methods.createLightBox(n(this),t.lightboxId,t.navigation),n.fn.mauGallery.listeners(t),n(this).children(".gallery-item").each(function(){n.fn.mauGallery.methods.responsiveImageItem(n(this)),n.fn.mauGallery.methods.moveItemInRowWrapper(n(this)),n.fn.mauGallery.methods.wrapItemInColumn(n(this),t.columns);var i=n(this).data("gallery-tag");t.showTags&&void 0!==i&&-1===e.indexOf(i)&&e.push(i)}),t.showTags&&n.fn.mauGallery.methods.showItemTags(n(this),t.tagsPosition,e),n(this).fadeIn(500)})},n.fn.mauGallery.defaults={columns:3,lightBox:!0,lightboxId:null,showTags:!0,tagsPosition:"bottom",navigation:!0},n.fn.mauGallery.listeners=function(t){n(".gallery-item").on("click",function(){t.lightBox&&"IMG"===n(this).prop("tagName")?n.fn.mauGallery.methods.openLightBox(n(this),t.lightboxId):void 0}),n(".gallery").on("click",".nav-link",n.fn.mauGallery.methods.filterByTag),n(".gallery").on("click",".mg-prev",function(){return n.fn.mauGallery.methods.prevImage(t.lightboxId)}),n(".gallery").on("click",".mg-next",function(){return n.fn.mauGallery.methods.nextImage(t.lightboxId)})},n.fn.mauGallery.methods={createRowWrapper:function(t){t.children().first().hasClass("row")||t.append('<div class="gallery-items-row row"></div>')},wrapItemInColumn:function(t,e){if("number"==typeof e)t.wrap('<div class=\'item-column mb-4 col-'+Math.ceil(12/e)+'\'></div>');else if("object"==typeof e){var i="";e.xs&&(i+=" col-"+Math.ceil(12/e.xs)),e.sm&&(i+=" col-sm-"+Math.ceil(12/e.sm)),e.md&&(i+=" col-md-"+Math.ceil(12/e.md)),e.lg&&(i+=" col-lg-"+Math.ceil(12/e.lg)),e.xl&&(i+=" col-xl-"+Math.ceil(12/e.xl)),t.wrap('<div class=\'item-column mb-4'+i+'\'></div>')}else console.error("Columns should be defined as numbers or objects. "+typeof e+" is not supported.")},moveItemInRowWrapper:function(t){t.appendTo(".gallery-items-row")},responsiveImageItem:function(t){"IMG"===t.prop("tagName")&&t.addClass("img-fluid")},openLightBox:function(t,e){n("#"+(e?e:"galleryLightbox")).find(".lightboxImage").attr("src",t.attr("src")),n("#"+(e?e:"galleryLightbox")).modal("toggle")},prevImage:function(){var t=null;n("img.gallery-item").each(function(){n(this).attr("src")===n(".lightboxImage").attr("src")&&(t=n(this))});var e=n(".tags-bar span.active-tag").data("images-toggle"),i=[];"all"===e?n(".item-column").each(function(){n(this).children("img").length&&i.push(n(this).children("img"))}):n(".item-column").each(function(){n(this).children("img").data("gallery-tag")===e&&i.push(n(this).children("img"))});var a=0,o=null;n(i).each(function(n){t.attr("src")===this.attr("src")&&(a=n-1)}),o=i[a]||i[i.length-1],n(".lightboxImage").attr("src",o.attr("src"))},nextImage:function(){var t=null;n("img.gallery-item").each(function(){n(this).attr("src")===n(".lightboxImage").attr("src")&&(t=n(this))});var e=n(".tags-bar span.active-tag").data("images-toggle"),i=[];"all"===e?n(".item-column").each(function(){n(this).children("img").length&&i.push(n(this).children("img"))}):n(".item-column").each(function(){n(this).children("img").data("gallery-tag")===e&&i.push(n(this).children("img"))});var a=0,o=null;n(i).each(function(n){t.attr("src")===this.attr("src")&&(a=n+1)}),o=i[a]||i[0],n(".lightboxImage").attr("src",o.attr("src"))},createLightBox:function(t,e,i){t.append('<div class="modal fade" id="'+(e?e:"galleryLightbox")+'" tabindex="-1" role="dialog" aria-hidden="true">\n                <div class="modal-dialog" role="document">\n                    <div class="modal-content">\n                        <div class="modal-body">\n                            '+(i?'<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>':'<span style="display:none;" />')+'\n                            <img class="lightboxImage img-fluid" alt="Contenu de l\'image affichée dans la modale au clique"/>\n                            '+(i?'<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>':'<span style="display:none;" />')+'\n                        </div>\n                    </div>\n                </div>\n            </div>')},showItemTags:function(t,e,i){var a='<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';n.each(i,function(t,e){a+='<li class="nav-item active">\n                <span class="nav-link"  data-images-toggle="'+e+'">'+e+"</span></li>"});var o='<ul class="my-4 tags-bar nav nav-pills">'+a+"</ul>";"bottom"===e?t.append(o):"top"===e?t.prepend(o):console.error("Unknown tags position: "+e)},filterByTag:function(){if(!n(this).hasClass("active-tag")){n(".active.active-tag").removeClass("active active-tag"),n(this).addClass("active-tag active");var t=n(this).data("images-toggle");n(".gallery-item").each(function(){n(this).parents(".item-column").hide(),"all"===t?n(this).parents(".item-column").show(300):n(this).data("gallery-tag")===t&&n(this).parents(".item-column").show(300)})}}}}(jQuery);
