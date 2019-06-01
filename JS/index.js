$('#insert').hide()

// DOM Ready
$(() => {

    // Initialize
    $('#insertLink').on('click', function() {
        $('#index').hide()
        $('#insert').show()
    })


    var items = null
    var pageCount = 9
    var showItems = (page) => {
        if (items == null) return
        var start = (page - 1) * pageCount
        var end = start + pageCount - 1
        $('#product-list').empty();
        for (var i = start; i <= end; i++) {
            if (items[i] == null) {
                break
            }
            newItem(items[i])
        }

    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n, page, s) => {
        $('#page-number').empty()

        // dlli
        if (s == 1) {
            $dla = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
            $dlli = $('<li>').attr('class', 'page-item').addClass('disabled').append($dla)
        } else {
            $dla = $('<a>').attr('class', 'page-link').attr('href', '#').text('«')
            $dlli = $('<li>').attr('class', 'page-item').append($dla)
        }
        $('#page-number').append($dlli)

        // lli
        if (page == 1) {
            $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('‹')
            $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)
        } else {
            $la = $('<a>').attr('class', 'page-link').attr('href', '#').text('‹')
            $lli = $('<li>').attr('class', 'page-item').append($la)
        }
        $('#page-number').append($lli)

        // li
        for (var i = s * 5 - 4; i <= s * 5 && i <= n; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                page = $(this).text()
                showItems(page)
                newPage(n, page, s)
            })
            if (page == i) {
                $li = $('<li>').attr('class', 'page-item active').addClass('disabled').append($a)
            } else {
                $li = $('<li>').attr('class', 'page-item').append($a)
            }
            $('#page-number').append($li)
        }

        // rli
        if (page == n) {
            $ra = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('›')
            $rli = $('<li>').attr('class', 'page-item').addClass('disabled').append($ra)
        } else {
            $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('›')
            $rli = $('<li>').attr('class', 'page-item').append($ra)
        }
        $('#page-number').append($rli)

        // drli
        if (s * 5 >= n) {
            $dra = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('»')
            $drli = $('<li>').attr('class', 'page-item').addClass('disabled').append($dra)
        } else {
            $dra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
            $drli = $('<li>').attr('class', 'page-item').append($dra)
        }
        $('#page-number').append($drli)

        // on click
        $dla.on('click', function() {
            s--
            page = s * 5
            showItems(page)
            newPage(n, page, s)
        })


        $la.on('click', function() {
            if ((page % 5) == 1) { s-- }
            page--
            showItems(page)
            newPage(n, page, s)
        })

        $ra.on('click', function() {
            if ((page % 5) == 0) { s++ }
            page++
            showItems(page)
            newPage(n, page, s)
        })

        $dra.on('click', function() {
            s++
            page = (s * 5) - 4
            if (page > n) { page = n }
            showItems(page)
            newPage(n, page, s)

        })
    }

    $('#query').on('click', function() {
        $('#insert').hide()
        $('#index').show()
        $.get('https://js.kchen.club/B04109002/query', function(response) {
            if (response) {
                if (response.result) {
                    $('#product-list').empty()
                    items = response.items

                    var pageNum = items.length / pageCount
                    pageNum = (items.length % pageCount != 0) ? pageNum + 1 : pageNum
                    pageNum = Math.floor(pageNum)

                    showItems(1)
                    $('#page').show()
                    newPage(pageNum, 1, 1)

                } else {
                    $('#message').text('No Related Item')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('Server Error')
                $('#dialog').modal('show')
            }
            console.log(response)
        }, "json")
    })

    $('#insertButton').on('click', function() {

        // Get data
        var data = {
                result: true,
                item: {
                    name: $('#inputProductName').val(),
                    price: Number($('#inputProductPrice').val()),
                    count: +$('#inputProductCount').val(),
                    image: $('#inputProductImage').val(),
                }
            }
            // 新增商品
        $.post('https://js.kchen.club/B04109002/insert', data, function(response) {
            if (response) {
                if (response.result) {
                    $('#message').text('Upload Success')
                    $('#dialog').modal('show')
                } else {
                    $('#message').text('Upload Fail')
                    $('#dialog').modal('show')
                }
            } else {
                $('#message').text('System Error')
                $('#dialog').modal('show')
            }
            console.log(response)
        }, "json")
    })

})