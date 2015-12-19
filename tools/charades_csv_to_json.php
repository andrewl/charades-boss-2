<?php
/** 
 * Simple script which takes a csv file in the format
 * "Charade Title","Charade Type"
 * and outputs it as an array of json objects with 
 * the properties 
 * Title
 * Charade_type
 */
if (!file_exists($argv[1])) {
  print "Failed to open {$argv[1]}";
  exit(1);
}
$input = fopen($argv[1], 'rb');
$charades = array();
while($row = fgetcsv($input)) {
  if (!empty($row[0])) {
    $charade = new stdClass();
    $charade->Title = $row[0];
    $charade->Charade_type = $row[1];
    $charades[] = $charade;
  }
}
fclose($input);
print "data = " . json_encode($charades);
