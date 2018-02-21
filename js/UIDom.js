/* ===FUNCTIONS FOR CREATING ELEMENTS=== */

/* If item has multiple items we have to wrap 
these items into <div class="grouped fields"></div> */
var createMultipleContent = function(){
    var mult = document.createElement('div');
    mult.classList.add('grouped','fields');
    return mult;
}

// <div class="content"></div>
var createContentWrapper = function(){
    var divContentWrapper = document.createElement("div");
    divContentWrapper.classList.add("content");

    return divContentWrapper
}

// <div class="ui form"></div>
var createUiForm = function(){
    var divForm = document.createElement("div");
    divForm.classList.add("ui", "form");

    return divForm;
}

/* CREATE SUB-ITEM (menuitem) IN MENU  WITH STRUCTURE: 
    <div class="item menuitem" id="mitem1101">
        <div class="ui ">
            <label>One-way ANOVA (use group variable)...</label>
        </div>
    </div>
*/
var createItemContent = function(labelContent, ID) {

  var menuitem = document.createElement("div");
  menuitem.classList.add("item", "menuitem");
  if(ID){menuitem.id = ID};

  var ui = document.createElement("div");
  ui.classList.add("ui");

  var labelText = document.createTextNode(labelContent);

  var label = document.createElement("label");
  label.appendChild(labelText);

  menuitem
  .appendChild(ui)
  .appendChild(label);

  return menuitem;
};


/* CREATE HEADER-TITLE FOR ITEM */
var createItemHeader = function(labelHeader) {
  //textcontent for div
  var textNode = document.createTextNode(labelHeader);
  
  // i.dropdown.icon
  var elIcon = document.createElement("i");
  elIcon.classList.add("dropdown", "icon");

  // a.active.title.header
  var elAnch = document.createElement("a");
  elAnch.classList.add("active", "title", "header");
  
  elAnch.appendChild(elIcon);
  elAnch.appendChild(textNode);

  return elAnch;
};



/* CREATE THE WHOLE ITEM WITH HEADER-TITLE AND ITS MENUITEMS */
var createMenuItem = function(item) {
  //div item
  var elDiv = document.createElement("div");
  elDiv.classList.add("item");

  /* If you are changing dom that cause expensive reflow, you can avoid it by using documentFragment as it is managed in the memory. */
  var fragment = document.createDocumentFragment();

  var targetDOM = fragment;
  
  var newItem = targetDOM.appendChild(elDiv);
    newItem.insertAdjacentElement('afterbegin', createItemHeader(item.label));

    var forContent = newItem.insertAdjacentElement('beforeend', createContentWrapper()).appendChild(createUiForm());
    
    /* If we have multiple sub-items we have to use createMultipleContent()
    for wrapping multiple items...
    But any way it will be an array. It has a length
     */
    if(Array.isArray(item.items)){
      //If we have only one item we have to avoid additional createMultipleContent()
       if(item.items.length>1){
           forContent = forContent.appendChild(createMultipleContent());
       } 
       item.items.forEach(subItem => {
           if(subItem.visibility){
              var addAttr; // for setting attributes
               /* If "id" is absent and “isenabled”=false" it is a sub-menu. 
                It doesn't have id, label and other stuff. It has class disable.
                Thus, click event returns id = undifined and data-cmd = undefined
                  */
               if(!subItem.id &&  !subItem.isenabled ){
                   addAttr = forContent.insertAdjacentElement('beforeend', createItemContent(subItem.label));
                   addAttr.classList.add('disabled');
                   return;
               }
               var ID = "mitem" + subItem.id;   
               addAttr = forContent.insertAdjacentElement('beforeend', createItemContent(subItem.label, ID));
               addAttr.setAttribute('data-cmd', subItem.id );
               addAttr.setAttribute('visibility', subItem.visibility );
               addAttr.setAttribute('isenabled', subItem.isenabled );
               addAttr.setAttribute('label', "menuitem" );
            } 
       })
    }
    
    document.getElementById("menuCmds").appendChild(fragment);

};

