// api start
var log = function() {
    console.log.apply(console, arguments)
}
var e = function(selector) {
    return document.querySelector(selector)
}
var es = function(selector) {
    return document.querySelectorAll(selector)
}
var bindEle = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}
var bindSel = function(selector, eventName, callback) {
    var element = document.querySelector(selector)
    element.addEventListener(eventName, callback)
}
var bindAllEle = function(elements, eventName, callback) {
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEle(e, eventName, callback)
    }
}
var bindAllSel = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEle(e, eventName, callback)
    }
}
var toggleClass = function(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}
var removeClassAll = function(className) {
    var selector = "." + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}

//api end

// start
var scroll = function() {
    return {
        "top": window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop,
        "left": window.pageXOffset || document.body.scrollLeft || document.documentElement.scrollLeft
    }
}
// scroll end

//getStyle start
var getStyle = function(element, attribute) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(element, null)[attribute]
    }
    return element.currentStyle[attribute]
}
//getStyle end

// animateSlow star
var animateSlow = function(element, json, millisec, callback) {
    clearInterval(element.time)
    element.time = setInterval(function() {
        var bool = true
        for (var k in json) {
            var current = parseInt(getStyle(element, k)) || 0
            var step = (json[k] - current) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step)
            current = current + step
            element.style[k] = current + "px"
            if (json[k] !== current) {
                bool = false
            }
        }
        if (bool) {
            clearInterval(element.time)
            if (callback) {
                callback()
            }
        }
    }, millisec)
}
// animateSlow end
//
// animateOpacity start
var animateOpacity = function(element, target, second) {
       var w = second*1000
        element.time = setInterval(function() {
            var current = Number(getStyle(element,"opacity")) || 0
            var step = Math.abs(target-current)/second/10
            step = (target-current)<0?-step:step
            element.style.opacity = current + step
        },10)
        var wait = setTimeout(function(){
            clearInterval(element.time)
        },w)

}
// animateOpacity end
//
//sidebar-left start
var sidebarLeft = function() {
    var sidebarLeft = document.querySelector(".sidebar-left")
    var height = 300
    var floorArr = document.querySelectorAll(".floorArr")
    var floorBoxArr = document.querySelectorAll(".floorBoxArr")
    var time = null
    var target = 0
    var current = 0
    bindEle(window, "scroll", function() {
        if (scroll().top > height) {
            sidebarLeft.style.display = "block"
            sidebarLeft.className = "sidebar-left fixed"
        }
        current = scroll().top
        for (var i = 0; i < floorArr.length - 1; i++) {
            if ((floorBoxArr[1].offsetTop - 50 + 553 * (i + 1)) > current
            &&current > (floorBoxArr[1].offsetTop - 50 - 10 + 553 * i)) {
                floorArr[i].style.background = "#B61D1D"
            }else{
                floorArr[i].style.background = "#918989"
            }
        }
    })
    for (var i = 0; i < floorArr.length; i++) {
        floorArr[i].index = i
        bindEle(floorArr[i], "click", function() {
            if (this.index === 5) {
                target = floorBoxArr[0].offsetTop
            } else if (this.index === 0) {
                target = floorBoxArr[1].offsetTop - 50
            } else if (this.index === 1) {
                target = floorBoxArr[1].offsetTop - 50 + 553 * 1
            } else if (this.index === 2) {
                target = floorBoxArr[1].offsetTop - 50 + 553 * 2
            } else if (this.index === 3) {
                target = floorBoxArr[1].offsetTop - 50 + 553 * 3
            } else if (this.index === 4) {
                target = floorBoxArr[1].offsetTop - 50 + 553 * 4
            }
            clearInterval(time)
            time = setInterval(function() {
                var step = (target - current) / 10
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current = current + step
                window.scrollTo(0, current)
                if (Math.abs(target - current) <= Math.abs(step)) {
                    window.scrollTo(0, target)
                    clearInterval(time)
                }
            }, 28)
        })
    }
}
//sidebar-left start

// fix-toolbar start
var fixToolbar = function() {
    var fixToolbar = document.querySelector(".fix-toolbar")
    var height = 300
    bindEle(window, "scroll", function() {
        if (scroll().top > height) {
            fixToolbar.style.display = "block"
            fixToolbar.className = "fix-toolbar fixed"
        }
        current = scroll().top
    })
    var fixTop = document.querySelector(".fix-toolbar-top")
    var time = null
    var target = 0
    var current = 0
    bindEle(fixTop, "click", function() {
        clearInterval(time)
        time = setInterval(function() {
            var step = (target - current) / 10
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            current = current + step;
            window.scrollTo(0, current)
            if (current === 0) {
                clearInterval(time)
            }
        }, 28)
    })
    var tyArr = document.querySelectorAll(".fix-toolbar-ty")
    var tyIArr = document.querySelectorAll(".fix-toolbar-ty i")
    for (var i = 0; i < tyArr.length; i++) {
        tyArr[i].index = i
        bindEle(tyArr[i], "mouseover", function() {
            tyIArr[this.index].style.background = "#B61D1D"
            animateSlow(tyIArr[this.index], {
                "margin-left": -51
            }, 15)
        })
        bindEle(tyArr[i], "mouseout", function() {
            tyIArr[this.index].style.background = "#7a6e6e"
            animateSlow(tyIArr[this.index], {
                "margin-left": 0
            }, 15)
        })
    }
}
// fix-toolbar end

// fix-search start
var fixSearch = function() {
    var fixSearch = document.querySelector(".fix-search")
    var height = 260
    bindEle(window, "scroll", function() {
        if (scroll().top > height) {
            fixSearch.style.display = "block"
            fixSearch.className = "fix-search fixed"
        } else {
            fixSearch.style.display = "none"
            fixSearch.className = "fix-search"
        }
    })
}
// fix-search end

// fix-banner star
var fixBanner = function() {
    var img = document.querySelectorAll(".fix-banner div")
    var direction = "y"
    bindEle(window, "scroll", function() {
        var top = scroll().top + 256
        animateSlow(img[0], {
            "top": top
        }, 28)
        animateSlow(img[1], {
            "top": top
        }, 28)
    })
    var ad = document.querySelector(".fix-banner")
    bindAllSel(".fix-banner span", "click", function() {
        animateOpacity(ad,0,2)
        var wait = setTimeout(function(){
            ad.style.display = "none"
        },200)
    })
}

// fix-banner end

// top-ad start
var topAd = function() {
    var ad = document.querySelector(".top-ad")
    bindSel(".close-ad", "click", function() {
        animateOpacity(ad,0,1.5)
        var wait = setTimeout(function(){
            ad.style.display = "none"
        },400)
    })
}




//carousel start
var carousel = function() {
    var timer = 1000
    var change = function(i, cur) {
        var len = 4
        if (i == 1) {
            var index = (len + cur - 1) % len
        }
        if (i == 2) {
            var index = (cur + 1) % len
        }
        changeDirect(index)
    }
    var changeDirect = function(index) {
        var element1 = e(`.img-${index}`)
        var element2 = e(`.list${index}`)
        var button1 = e(".carousel-button-left")
        var button2 = e(".carousel-button-right")
        var button3 = e("#carousel-button-prev")
        var button4 = e("#carousel-button-next")
        button1.dataset.list = index
        button2.dataset.list = index
        button3.dataset.list = index
        button4.dataset.list = index
        removeClassAll("active")
        removeClassAll("highlight")
        toggleClass(element1, "active")
        toggleClass(element2, "highlight")
    }
    var changeAuto = function() {
        var button1 = e(".carousel-button-left")
        var cur = parseInt(button1.dataset.list)
        var i = 2
        change(i, cur)
    }
    bindAllSel(".carousel-button button", "click", (event) => {
        var self = event.target
        var index = parseInt(self.dataset.index)
        var cur = parseInt(self.dataset.list)
        clearInterval(time1)
        change(index, cur)
        time1 = setInterval(changeAuto, timer)
    })
    bindAllSel(".carousel-list li", "mouseover", (event) => {
        var self = event.target
        var index = parseInt(self.dataset.list)
        clearInterval(time1)
        changeDirect(index)
    })
    bindAllSel(".carousel-list li", "mouseout", () => {
        time1 = setInterval(changeAuto, timer)
    })
    bindSel(".carousel-one", "mouseover", () => {
        clearInterval(time1)
        var button = document.querySelector(".carousel-button")
        button.style.display = "block"
    })
    bindSel(".carousel-one", "mouseout", () => {
        var button = document.querySelector(".carousel-button")
        button.style.display = "none"
        clearInterval(time1)
        time1 = setInterval(changeAuto, timer)
    })
    var time1 = setInterval(changeAuto, timer)
}
//carousel end

//main start
function main() {
    sidebarLeft()
    fixToolbar()
    fixBanner()
    fixSearch()
    topAd()
    carousel()
}
main()
//main end
