<?php
date_default_timezone_set('Asia/Jakarta');
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
if($aksi == 'retrieveSurah'){
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
} else if($aksi == 'retrieveAyatById'){
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
} else if($aksi == 'retrieveHistory'){
    $device_id = $_GET['device_id'];
    $sql = "SELECT * FROM tb_quran_history WHERE device_id = '$device_id' ORDER BY id DESC";
    $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                $sql1 = "SELECT * FROM surah WHERE id_surah = '$row[surah_id]'";
                $result1 = $conn->query($sql1);
                $row1 = $result1->fetch_assoc();
                $sql2 = "SELECT * FROM quran_id WHERE suraId = '$row[surah_id]'";
                $result2 = $conn->query($sql2);
                $jumlah_ayat = $result2->num_rows;
                $array = [
                    "id_surah"=>$row1["id_surah"],
                    "nama_surah"=>htmlspecialchars($row1["nama_surah"]),
                    "jenis_surah"=>$row1["jenis_surah"],
                    "date"=>$row['date'],
                    "jumlah_ayat" => $jumlah_ayat
                ];
                $arrayin[] = $array;
            }
            print_r(json_encode($arrayin, JSON_PRETTY_PRINT));
        } else {
            echo "0 results";
        }
        $conn->close();        
} else if($aksi == 'addDevice'){
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $device_id = $_POST['device_id'];
        $platform = $_POST['platform'];
        $date = date("Y-m-d");
        
        $sql_check = "SELECT * FROM `users_device` WHERE device_id = '$device_id'";
        $query_check = $conn->query($sql_check);
        if($query_check->num_rows) {
            echo "Failed, Device Already Registered";
        } else {
            $sql = "INSERT INTO `users_device`(`device_id`, `platform`, `date`) VALUES ('$device_id','$platform','$date')";
            if ($conn->query($sql) === TRUE) {
                echo "Successfully, Add New Record";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close();
        }
        
    }
} else if($aksi == 'addHistory'){
    if($_SERVER['REQUEST_METHOD'] == 'POST')
    {
        $device_id = $_POST['device_id'];
        $surah_id = $_POST['surah_id'];
        $date = date("Y-m-d H:i:s");
        $sql_check = "SELECT * FROM `tb_quran_history` WHERE device_id = '$device_id' AND surah_id = '$surah_id'";
        $query_check = $conn->query($sql_check);
        if($query_check->num_rows) {
            $sql = "UPDATE `tb_quran_history` SET date = '$date' WHERE device_id = '$device_id' AND surah_id = '$surah_id'";
            if ($conn->query($sql) === TRUE) {
                echo "Successfully, Updated Record";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
        } else {
            $sql = "INSERT INTO `tb_quran_history`(`device_id`, `surah_id`, `date`) VALUES ('$device_id','$surah_id','$date')";
            if ($conn->query($sql) === TRUE) {
                echo "Successfully, Add New Record";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            $conn->close();
        }
    }
    
}
