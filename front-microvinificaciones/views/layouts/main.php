<?php
use app\assets\AppAsset;
use app\widgets\Alert;
use yii\bootstrap5\Breadcrumbs;
use yii\bootstrap5\Html;
use yii\bootstrap5\Nav;
use yii\bootstrap5\NavBar;
AppAsset::register($this);
$this->registerCsrfMetaTags();
$this->registerMetaTag(["charset" => Yii::$app->charset], "charset");
$this->registerMetaTag(["name" => "viewport", "content" => "width=device-width, initial-scale=1, shrink-to-fit=no"]);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="<?= Yii::$app->language ?>" class="h-100">
<head>
    <title><?= Html::encode($this->title) ?></title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">
    <?php $this->head() ?>
</head>
<body class="d-flex flex-column h-100">
<?php $this->beginBody() ?>
<header id="header">
    <?php
    NavBar::begin([
        "brandLabel" => "Microvinificaciones",
        "brandUrl" => Yii::$app->homeUrl,
        "options" => ["class" => "navbar-expand-md navbar-dark fixed-top"]
    ]);
    echo Nav::widget([
        "options" => ["class" => "navbar-nav ms-auto"],
        "items" => [
            ["label" => "Inicio", "url" => ["/site/index"]],
            ["label" => "Viñedos", "url" => ["/vinedo/index"]],
            ["label" => "Muestras", "url" => ["/muestra/index"]],
            Yii::$app->user->isGuest
                ? ["label" => "Login", "url" => ["/site/login"]]
                : "<li class=\"nav-item\">"
                    . Html::beginForm(["/site/logout"])
                    . Html::submitButton(
                        "Logout (" . Yii::$app->user->identity->username . ")",
                        ["class" => "nav-link btn btn-link logout"]
                    )
                    . Html::endForm()
                    . "</li>"
        ]
    ]);
    NavBar::end();
    ?>
</header>
<main id="main" class="flex-shrink-0" role="main">
    <div class="container">
        <?php if (!empty($this->params["breadcrumbs"])): ?>
            <?= Breadcrumbs::widget(["links" => $this->params["breadcrumbs"]]) ?>
        <?php endif ?>
        <?= Alert::widget() ?>
        <?= $content ?>
    </div>
</main>
<footer id="footer" class="mt-auto py-3">
    <div class="container text-center">
        <span class="text-muted">&copy; Microvinificaciones <?= date("Y") ?></span>
    </div>
</footer>
<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>