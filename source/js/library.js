$(document).ready(function() {

  // List.js Implementation
  var fuzzyOptions = {
    searchClass: "fuzzy-search",
    location: 0,
    distance: 100,
    threshold: 0.4,
    multiSearch: true
  };

  var options = {
    valueNames: [ 'result-item__name', 'result-item__authors', {name:'result-item__publication', attr:'data-publication'}, {name:'result-item__publicationDate', attr:"data-timestamp"}, 'result-item__short-description', {name:'resource-type', attr:'data-type'}, {name:'resource-category', attr:'data-category'}, {name:'resource-objective', attr:'data-objective'}, {name:'resource-methodology', attr:'data-methodology'}]
  };

  var resourceList = new List('resources', options);
  // Filter by name and location
  $(".fuzzy-search").keyup(function() {
    var searchString = $(this).val();
    resourceList.fuzzySearch(searchString);
  });

  // SORT ICON
  var sortClickButtons = $("#pubdate-sort > i:contains('keyboard_arrow_down')");
  sortClickButtons.on("click", function() {
      $(this).text() == "keyboard_arrow_down" ? $(this).text("keyboard_arrow_up") : $(this).text("keyboard_arrow_down");

  });

  // DROPDOWN FILTERS
  var allFilters = $(".dropdown-wrapper select");
  var searchQueries = {};

  allFilters.on("change", function() {
    filterList();
  });

  function filterList() {
    allFilters.each(function(idx, selection) {
      $(selection).each(function(idx, option) {
        var filterSelection = $(this).attr("data-filter");
        var option = $(this).children(":selected").attr("id");
        searchQueries[filterSelection] = option;
      });
    });

    // FILTER WITH DROPDOWNS
    resourceList.filter(function(item) {
      if (item.values()["resource-type"] !== null 
        && (item.values()["resource-type"].indexOf(searchQueries["resource-type"]) != -1)
        && item.values()["resource-category"] !== null 
        && (item.values()["resource-category"].indexOf(searchQueries["resource-category"]) != -1)
        && item.values()["resource-objective"] !== null 
        && (item.values()["resource-objective"].indexOf(searchQueries["resource-objective"]) != -1)
        && item.values()["resource-methodology"] !== null 
        && (item.values()["resource-methodology"].indexOf(searchQueries["resource-methodology"])!= -1)
        )  {
        return true;
      } else {
        return false;
      }
    });
  }

  // CLEAR ALL FILTERS
  $(".clear_filters").on("click", function() {
    allFilters.each(function(idx,filter) {
      $('#'+filter.id).prop('selectedIndex',0);
    });
    resourceList.filter();
    searchReset();
    resourceList.sort('result-item__name', { order: "asc" });
  });

  // SEARCH RESET
  function searchReset() {
    resourceList.search();
  }

  // slug helper
  function slug(text)
  {
    return text.toString().toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w.-]+/g, '');
  }

  // Metadata click handlers
  $('body').on('click','.result-item__tag', function(){
    // clear all filters
    allFilters.each(function(idx,filter) {
      $('#'+filter.id).prop('selectedIndex',0);
    });
    resourceList.filter();
    searchReset();
    resourceList.sort('result-item__name', { order: "asc" });
    // get meta filter values
    var metaFilterValue = slug($(this).text());
    var metaFilterTarget = $(this).attr('data-filter');
    var metaDropdownTarget = $("select[data-filter='" + metaFilterTarget +"']");
    var metaDropdownTargetOptions = $("#" + metaDropdownTarget.attr("id") + " option");
    // get idx of active dropdown filter
    var metaDropdownTargetId;
    metaDropdownTargetOptions.each(function(idx, option){ 
      if (option.id == metaFilterValue) {
        metaDropdownTargetId = idx;
      }
    })
    metaDropdownTarget.prop("selectedIndex",metaDropdownTargetId)

    resourceList.filter(function(item){
      if (item.values()[metaFilterTarget] !== null && (item.values()[metaFilterTarget].indexOf(metaFilterValue) != -1)) {
        return true;
      } else {
        return false;
      }
    })
  }); // End Metadata click handlers

  $('body').on('click', '.show-filters', function() {
    $(this).find('.material-icons').text() == "add" ? $(this).find('.material-icons').text("remove") : $(this).find('.material-icons').text("add");
    $(this).toggleClass("active");
    $('.dropdown-container').toggleClass("active");
  })

});