<?php
$a = 2;
$b = 2;
define("yolo", 9);

$$a = $a;
echo "$$ a = ". $$a . "\n";
echo $a.$$a."\n";


echo $a."".$b."\n";
echo $a+$b."\n";
echo yolo;
echo "\n";

if (isset($a)) {
    echo "$a is not null\n";
}
else {
    echo "$a is null\n";
}

if($a == $b){
    echo "a equal to b\n";
}
if($a === $b){
    echo "a is equal in type as well\n";
}

function lesgooo($a, $b){
    $a + $b;
    echo $a+$b;
}

lesgooo(2,4);

 #
 //
 
 /*
 neat*/


?>