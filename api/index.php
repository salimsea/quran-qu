<?php
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "quran";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$aksi = $_GET['aksi'];
if($aksi == 'retrieveAll'){
    $sql = "SELECT * FROM surah ORDER BY id";
    $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $sql1 = "SELECT * FROM quran_id WHERE suraId = '$row[id_surah]'";
                $result1 = $conn->query($sql1);
                $jumlah_ayat = $result1->num_rows;
                $array = [
                    "id_surah"=>$row["id_surah"],
                    "nama_surah"=>htmlspecialchars($row["nama_surah"]),
                    "jenis_surah"=>$row["jenis_surah"],
                    "jumlah_ayat"=>$jumlah_ayat
                ];
                $arrayin[] = $array;
            }
            print_r(json_encode($arrayin, JSON_PRETTY_PRINT));
        } else {
            echo "0 results";
        }
        $conn->close();
} else if($aksi == 'retrieveById'){
    $id = $_GET['id'];
    $sql = "SELECT * FROM quran_id WHERE suraId = '$id'";
    $conn->query("SET NAMES 'utf8'");
    $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $array[] = [
                    "nomor"=>$row["verseID"],
                    "ayat"=>$row["ayahText"],
                    "terjemahan"=>htmlspecialchars($row["indoText"])
                ];
            }
            print_r(json_encode($array, JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        } else {
            echo "0 results";
        }
        $conn->close();
}
?>
 
