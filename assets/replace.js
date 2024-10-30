jQuery(function($) {
  var progress, replace_progress, select_ids;
  select_ids = $("input.select_id").val();
  select_ids = select_ids.split(",");
  replace_progress = function(select_ids) {
    this.ajax_process;
    this.count = 0;
    this.max_posts = Number($("input.max_posts").val());
    this.stop_flag = false;
    this.get_time = function() {
      var hh, mm, now, ss;
      now = new Date();
      hh = ("0" + now.getHours()).slice(-2);
      mm = ("0" + now.getMinutes()).slice(-2);
      ss = ("0" + now.getSeconds()).slice(-2);
      return hh + ":" + mm + ":" + ss;
    };
    this.working = function(select_id) {
      $(".message").prepend(progress.get_time() + " Post ID " + select_id + " Start.<br />");
      return $.ajax({
        type: "POST",
        url: external_image_replace_ajax.ajax_url,
        data: {
          action: "external_image_replace",
          select_id: select_id
        }
      }).then(function(response) {
        $(".message").prepend(progress.get_time() + " " + response + "<br />");
        return progress.complete();
      }, function() {
        $(".message").prepend(progress.get_time() + " <span class='error_message'>Error！</span> Post ID " + select_id + " Processing could not be executed.<br />");
        return progress.complete();
      });
    };
    this.complete = function() {
      ++this.count;
      $(".progress_text").text(this.count);
      if (this.count === this.max_posts) {
        $(".message").prepend("Complete.<br />");
        $("#search_button").prop("disabled", false);
        return $("#stop_button").prop("disabled", true);
      } else if (this.stop_flag === false) {
        return progress.working(select_ids[this.count]);
      } else {
        return progress.work_stop();
      }
    };
    this.work_stop = function() {
      $(".message").prepend("Quit.<br />");
      return $("#search_button").prop("disabled", false);
    };
  };
  progress = new replace_progress(select_ids);
  progress.working(select_ids[0]);
  return $("#stop_button").click(function() {
    progress.stop_flag = true;
    $(".message").prepend("It is aborted after completion of currently executing processing.<br />");
    return $("#stop_button").prop("disabled", true);
  });
});

//# sourceMappingURL=replace.js.map