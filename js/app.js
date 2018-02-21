$(".ui.accordion").accordion();
/* I've copied code from https://jsfiddle.net/alexst/cpcozcd4/ 
but there is an issue with console.log($(this).id);. 
It returns undefined.

There is a link to https://stackoverflow.com/questions/10578566/jquery-this-id-return-undefined
with a similar problem.

Answer:

    $(this) and this aren't the same. The first represents a jQuery object
    wrapped around your element. The second is just your element. 
    The id property exists on the element, but not the jQuery object. 
    As such, you have a few options:

    1. Access the property on the element directly:

        this.id

    2. Access it from the jQuery object:

        $(this).attr("id")

    3. Pull the object out of jQuery:

        $(this).get(0).id; // Or $(this)[0].id

    4. Get the id from the event object:
 */
$(".ui.menu").on("click", ".menuitem", function() {
  if ($(this).hasClass("item")) {
    console.log($(this).id);
    // or use data- attr via dataset
    alert($(this).attr("id") + "\n" + $(this).attr("data-cmd"));
  }
});

//Get json file. Need live-server for fetch
fetch('menu_en.json')
.then(response => response.json())
.then(jsonResponse => {
    jsonResponse.items.forEach(item => {
        createMenuItem(item);
    });
});  