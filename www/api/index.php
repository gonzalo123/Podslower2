<?php

include __DIR__ . '/../../vendor/autoload.php';

use Silex\Application;
use Symfony\Component\HttpFoundation\Request;
use GetId3\GetId3Core;

$app = new Application();

$app->get("/mp3info", function (Application $app, Request $request) {
    $audio   = [];
    $tmpFile = tempnam('/tmp', 'ID3tags');
    $app->after(function () use ($tmpFile) {
        unlink($tmpFile);
    });

    if ($fp_remote = fopen($request->get('mp3'), 'rb')) {
        if ($fp_local = fopen($tmpFile, 'wb')) {
            $buffer = fread($fp_remote, 1024);
            fwrite($fp_local, $buffer);
            fclose($fp_local);
            $audio = (new GetId3Core())->setEncoding('UTF-8')->analyze($tmpFile);
        }
        fclose($fp_remote);
    }

    return $app->json($audio['id3v2']['comments']);
});

$app->run();