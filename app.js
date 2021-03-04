const items = document.querySelectorAll(".items")
let item
let entered

//using event delegation here to minimize multiple listener attachments to each child 
for(const i of items)
{
    i.addEventListener("dragstart",dragStart)
    i.addEventListener("drop",drop)
    i.addEventListener("dragover",dragOver)
    i.addEventListener("dragenter",dragEnter)
}

//stores dragged item
function dragStart(e)
{
    item = e.target
}

//move down other items when dragged item is dragged over them to show user where the item will be dropped
function dragOver(e)
{
    e.preventDefault()

    if(this!=e.target && e.target != item)
    {
        if(!e.target.classList.contains("move-down"))
        {
            e.target.className += " move-down"
        }
    }
}

//removes move-down animation
function dragEnter(e)
{
    e.preventDefault()
    if(this!=e.target)
    {
        if(entered && entered!=e.target)
        {
            entered.className = "item"
        }
        entered = e.target
    }
}

//drops item to specified position
function drop(e)
{
    item.className="item"
    entered.className="item"
    this.insertBefore(item,this.children[Array.prototype.indexOf.call(this.children, entered)])
}


