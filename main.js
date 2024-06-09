// Add event listener for click events on list items
$(".tissue-list").on("click", function() {
    $(this).addClass("animated bounce");

    // Remove animation after 1 second
    setTimeout(function() {
        $(".tissue-list").removeClass("animated bounce");
    }, 1000);
});
