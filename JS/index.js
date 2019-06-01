// 當文件已經全載入至記憶體時，開始執行程式
$(document).ready(function() {

    // 清空 product-list
    $('#product-list').empty()
    $('#page').hide()
    $('#insert').hide()
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
                return
            }
            newItem(items[i])
        }

    }

    var newItem = (item) => {
        $img = $('<img>').attr('class', 'image').attr('src', item.image)
        $h3 = $('<h3>').attr('class', 'name').text(item.name)
        $p = $('<p>').attr('class', 'price').text('NT$ ' + item.price)

        $item = $('<div>').attr('class', 'item').append($img).append($h3).append($p)
        $col = $('<div>').attr('class', 'col-*').append($item)

        $('#product-list').append($col)
    }

    var newPage = (n, page) => {

        console.log('inNewPage')
        var pageNum = n / pageCount
        pageNum = (n % pageCount != 0) ? pageNum + 1 : pageNum
        pageNum = Math.floor(pageNum)

        $('#page-number').empty()

        // lli
        if (page == 1) {
            $la = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('«')
            $lli = $('<li>').attr('class', 'page-item').addClass('disabled').append($la)
        } else {
            $la = $('<a>').attr('class', 'page-link').attr('href', '#').text('«')
            $lli = $('<li>').attr('class', 'page-item').append($la)
        }
        $('#page-number').append($lli)

        // li
        for (var i = 1; i <= pageNum; i++) {
            $a = $('<a>').attr('class', 'page-link').attr('href', '#').text(i)

            $a.on('click', function() {
                page = $(this).text()
                showItems(page)
                newPage(n, page)
            })

            var strActive = ((page == i) ? ' active' : '')
            $li = $('<li>').attr('class', 'page-item' + strActive).append($a)
            $('#page-number').append($li)
        }

        // rli
        if (page == pageNum) {
            $ra = $('<a>').attr('class', 'page-link').attr('href', '#').attr('tabindex', '-1').attr('aria-disabled', 'true').text('»')
            $rli = $('<li>').attr('class', 'page-item').addClass('disabled').append($ra)
        } else {
            $ra = $('<a>').attr('class', 'page-link').attr('href', '#').text('»')
            $rli = $('<li>').attr('class', 'page-item').append($ra)
        }
        $('#page-number').append($rli)

        // on click
        $la.on('click', function() {
            page--
            showItems(page)
            newPage(n, page)
        })

        $ra.on('click', function() {
            page++
            showItems(page)
            newPage(n, page)
        })
    }

    $('#query').on('click', function() {
        $('#insert').hide()
        $('#index').show()
        $.get('https://js.kchen.club/B04109002/query', function(response) {
            if (response) {
                // 伺服器有回傳資料
                if (response.result) {
                    $('#product-list').empty();
                    // 資料庫有回傳資料
                    items = response.items
                        // 加了分頁效果，預設顯示第一頁
                    showItems(1)

                    // 顯示分頁和設定分頁的函式
                    $('#page').show()
                    newPage(items.length, 1)

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

})