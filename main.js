$(document).ready(function () {
    var $grid = $('.grid');

    $.get('card.html', function (html) {
        for (var index = 0; index < 60; index++) {

            var types = [
                'reverse',
                'fixed',
                'normal'
            ];

            var datesStart = [
                '16/10/2019',
                '17/10/2019',
                '18/10/2019',
                '19/10/2019',
                '20/10/2019',
                '21/10/2019'
            ];

            var datesEnd = [
                '22/10/2019',
                '23/10/2019',
                '24/10/2019',
                '25/10/2019',
                '26/10/2019',
                '27/10/2019'
            ];

            var routes = [
                '<tr>\n' +
                '                <td class="align-middle text-right">Porto Alegre - RS</td>\n' +
                '                <td class="align-middle text-center">\n' +
                '                    <i class="material-icons chevron">chevron_right</i>\n' +
                '                </td>\n' +
                '                <td class="align-middle text-left">São Paulo - SP</td>\n' +
                '            </tr>',
                '<tr>\n' +
                '                <td class="align-middle text-right">São Paulo - SP</td>\n' +
                '                <td class="align-middle text-center">\n' +
                '                    <i class="material-icons chevron">chevron_right</i>\n' +
                '                </td>\n' +
                '                <td class="align-middle text-left">Salvador - BA</td>\n' +
                '            </tr>',
                '<tr>\n' +
                '                <td class="align-middle text-right">Salvador - BA</td>\n' +
                '                <td class="align-middle text-center">\n' +
                '                    <i class="material-icons chevron">chevron_right</i>\n' +
                '                </td>\n' +
                '                <td class="align-middle text-left">Recife - PE</td>\n' +
                '            </tr>'
            ];

            var weights = [
                '50,00',
                '70,00',
                '60,00',
                '30,00',
                '35,00'
            ];

            var prices = [
                '3.999,00',
                '15.550,00',
                '13.440,00',
                '19.555,00',
                '1000,00'
            ];

            var bids = [
                5,
                15,
                35,
                24,
                0,
                8
            ];

            var loads = [
                40,
                15,
                35,
                24,
                30,
                8
            ];

            var states = [
                'rs',
                'sp',
                'ba',
                'pe'
            ];

            var result = render(html, 'type', types);
            var htmlRoutes = '';

            for (var route = 0; route <= randonInt(1, 5); route++) {
                htmlRoutes += getRandonItem(routes);
            }

            result = result.replace('{{routes}}', htmlRoutes);
            result = render(result, 'start', datesStart);
            result = render(result, 'end', datesEnd);
            result = render(result, 'bids', bids);
            result = render(result, 'weights', weights);
            result = render(result, 'prices', prices);
            result = render(result, 'loads', loads);
            result = render(result, 'state', states);

            $grid.append(result);
        }

        $grid.find('.card.reverse .title').text('Leilão Reverso');
        $grid.find('.card.fixed .title').text('Leilão Fixo');

        $grid.find('.card.reverse .btn-primary').removeClass('btn-primary').addClass('btn-success');
        $grid.find('.card.normal .btn-primary').removeClass('btn-primary').addClass('btn-warning');

        $grid.isotope({
            itemSelector: '.offers'
        });


        declarePopOvers();

    });

    $('.filters-type').on('click', '[data-type]', function () {
        var type = $(this).data('type');
        if (type === 'all') {
            $grid.isotope({filter: '*'});
            return;
        }

        $grid.isotope({
            filter: function () {
                return $(this).find('.' + type).length;
            }
        })
    });

    $('.filters-type').on('change', '[data-range]', function (e) {
        var init = $('[data-range="init"]').val();
        var end = $('[data-range="end"]').val();

        $('[data-init-label]').text(new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(init));
        $('[data-end-label]').text(new Intl.NumberFormat('pt-BR',{ style: 'currency', currency: 'BRL' }).format(end));

        $grid.isotope({
            filter: function () {
                var cardValue = parsePrice($(this).find('.title').next('h2').text());
                return cardValue >= init && cardValue <= end;
            }
        });
    });

    $('.table').on('click', '.parent', function () {
       $(this).parent('tbody').find('.child').toggle(500);
    });


    $('[date-picker]').pickdate();
    $('[data-toggle="tooltip"]').tooltip();
    declarePopOvers();

});

function parsePrice(priceString) {
    return parseFloat(priceString.replace('.', '').replace(',', '.'));
}


function declarePopOvers() {
    $('[data-toggle="popover"]').popover({
        container: 'body',
        html: true,
        content: function () {
            return $(this).find('.popover').html();
        }
    });
}


function getRandonItem(collection) {
    return collection[Math.floor(Math.random() * collection.length)];
}

function render(html, id, data) {
    return html.replace(new RegExp('{{' + id + '}}', 'g'), getRandonItem(data));
}

function randonInt(min, max) // min and max included
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}