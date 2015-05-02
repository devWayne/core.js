core.js[![Build Status](https://travis-ci.org/devWayne/core.js.svg?branch=master)](https://travis-ci.org/devWayne/core.js)
============
> light-weight JSlib compatible with jQuery/Zepto API

## Usage

## API

### HTML/Text/Value

#### text()

text()  ⇒ string
text(content)  ⇒ self  

#### html()

html()  ⇒ string
html(content)  ⇒ self   

#### val()

val()  ⇒ string
val(value)  ⇒ self

### Node Manipulation

#### eq()

$('li').eq(0)   //=> only the first list item
$('li').eq(-1)  //=> only the last list item

#### get()

get()  ⇒ array
get(index)  ⇒ DOM node

#### parent()

parent([selector])  ⇒ collection

#### parents()

parents([selector])  ⇒ collection

#### children()

children([selector])  ⇒ collection

#### find()

find(selector)  ⇒ collection
find(collection)  ⇒ collection v1.0+
find(element)  ⇒ collection v1.0+

### Class and Attributes

#### attr(name,value)

attr(name)  ⇒ string
attr(name, value)  ⇒ self

#### removeAttr(name)

removeAttr(name)  ⇒ self

#### hasClass(name)

hasClass(name)  ⇒ boolean

#### addClass(name)

addClass(name)  ⇒ self

#### removeClass(name)

removeClass([name])  ⇒ self

#### toggleClass(name)

toggleClass(names, [setting])  ⇒ self

### CSS

#### css(name,value)

css(property)  ⇒ value
css([property1, property2, ...])  ⇒ object v1.1+
css(property, value) 

#### show()

show()  ⇒ self

#### hide() 

hide()  ⇒ self

### offset()

offset()  ⇒ object

#### width()

width()  ⇒ number
width(value)  ⇒ self

#### height()

height()  ⇒ number
height(value)  ⇒ self

### Utils
