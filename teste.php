<?php
/**
 * Created by PhpStorm.
 * User: rene-
 * Date: 16/01/2019
 * Time: 00:17
 */



function getRandonWord() {
    $words = ucwords('Lorem ipsum dolor sit amet consectetur adipiscing elit Proin dapibus et diam ornare Cras gravida sodales arcu in commodo');
    return implode(' ', array_rand(explode(' ', array_flip($words)), rand(1,3)));
}


for($index = 0; $index <= 32; $index ++) {
    $company = getRandonWord();
    echo '<div class="col">
                            <div class="custom-control custom-checkbox">
                                <input type="checkbox" class="custom-control-input" id="chk001">
                                <label class="custom-control-label" for="chk001">'.$company.'</label>
                            </div>
                        </div>';
}