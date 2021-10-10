var range = 1000000
var is_check = []
for (var i = 0; i <= range; ++i) {
    is_check.push(false)
}
var prime = []
var num_per_sec = 120
var size = 0

var height
var width

is_check[0] = true
is_check[1] = true
is_check[2] = true
prime.push(2)
for (var i = 2; i <= range; ++i) {
    if (!is_check[i]) {
        prime.push(i)
    }
    is_check[i] = true
    for (var j = 0; j < prime.length && i*prime[j] < range; ++j) {
        is_check[i*prime[j]] = true
        if (i*prime[j] == false) break
    }
}

function draw_points(ctx) {
    ctx.clearRect(-width/2, -height/2, width, height)
    var scalar = 1;
    if (prime[size] > width) scalar = width/prime[size]
    ++size
    for (var i = 0; i < size; ++i) {
        var p = prime[i]
        var x = p*Math.cos(p)*scalar
        var y = p*Math.sin(p)*scalar
        ctx.fillRect(x-1, y-1, 2, 2)
    }
}



$(document).ready(function() {
    height = window.innerHeight
    width = window.innerWidth
    const canvas = document.querySelector('#main-canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    ctx.lineCap = 'round'
    ctx.fillStyle = "#00FF00"
    ctx.translate(width / 2, height / 2)

    //setup()
    var interval = setInterval(function() {
        draw_points(ctx)
        if (size >= prime.length) clearInterval(interval)
    }, 1000 / num_per_sec)
});