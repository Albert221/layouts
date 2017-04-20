<?php

use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Message\ResponseInterface as Response;

session_start();

require 'vendor/autoload.php';

$slim = new Slim\App([
    'debug' => in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])
]);

$slim->getContainer()['mailer'] = function () {
    $transport = Swift_SmtpTransport::newInstance('host', 587)
        ->setUsername('email')
        ->setPassword('password');
    
    return Swift_Mailer::newInstance($transport);
};

$slim->get('/', function (Request $request, Response $response) {
    return $response->getBody()->write(file_get_contents('media/index.html'));
});

$slim->post('/send', function (Request $request, Response $response) {
    if (!in_array($request->getServerParams()['SERVER_NAME'], ['localhost', '4bitmedia.dev', '4bitmedia.pl'])) {
        return $response->withStatus(403);
    }

    $now = new DateTime();
    $ip = $_SERVER['REMOTE_ADDR'];
    if (array_key_exists($ip, $_SESSION['antiflood'])) {
        $time = $_SESSION['antiflood'][$ip];

        if ($now->getTimestamp() - $time->getTimestamp() > 60 * 60) {
            unset($_SESSION['antiflood'][$ip]);
        } else {
            $body = $response->getBody();
            $body->write(json_encode([
                'error' => 'Możesz wysłać jedną wiadomość na godzinę.'
            ]));

            return $response->withStatus(400)->withBody($body);
        }
    }

    $subject = $request->getParsedBody()['subject'];
    $from = $request->getParsedBody()['email'];
    $content = $request->getParsedBody()['content'];

    $message = Swift_Message::newInstance("4bitMedia.pl formularz - $subject - $from")
        ->setFrom(['mail@4bitmedia.pl' => '4bitMedia.pl formularz'])
        ->setTo('w.albert221@gmail.com')
        ->setBody($content);

    if (!$this->get('mailer')->send($message)) {
        return $response->withStatus(500);
    }

    $_SESSION['antiflood'][$ip] = $now;

    return $response;
});

$slim->run();