jQuery(function($) {
  $("input.all_check").click(function() {
    $("input.post_id").prop("checked", $("input.all_check").prop("checked"));
    return $("#replace_start").prop("disabled", !$("input.all_check").prop("checked"));
  });
  $("input.post_id").click(function() {
    var all_check, check_count, disabled, max_count;
    max_count = $("input.post_id").length;
    check_count = $("input.post_id:checked").length;
    disabled = true;
    all_check = false;
    if (check_count > 0) {
      disabled = false;
    }
    if (check_count === max_count) {
      all_check = true;
    }
    $("input.all_check").prop("checked", all_check);
    return $("#replace_start").prop("disabled", disabled);
  });
  return $("form").submit(function() {
    return $("button[type='submit']").prop("disabled", true);
  });
});

//# sourceMappingURL=search.js.map