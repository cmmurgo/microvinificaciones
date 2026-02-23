<?php
/** @var yii\web\View $this */
/** @var app\models\Vinedo[] $vinedos */
use yii\bootstrap5\Html;
$this->title = "Microvinificaciones";
?>
<div class="site-index">
    <div class="text-center mb-4">
        <h1 class="display-4">Microvinificaciones</h1>
        <p class="lead">Gestión de viñedos y muestras</p>
        <?= Html::a("Sincronizar Datos", ["#"], ["class" => "btn btn-primary w-100 mb-3", "onclick" => "alert(\"Sincronización completada (Simulado)\"); return false;"]) ?>
    </div>
    <div class="body-content">
        <div class="row">
            <?php if (empty($vinedos)): ?>
                <div class="col-12 text-center text-muted">
                    <p>No hay viñedos registrados todavía.</p>
                </div>
            <?php else: ?>
                <?php foreach ($vinedos as $vinedo): ?>
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title"><?= Html::encode($vinedo->localidad) ?></h5>
                                <p class="card-text">
                                    <strong>Sistema:</strong> <?= Html::encode($vinedo->sistema_conduccion) ?><br>
                                    <strong>Provincia:</strong> <?= Html::encode($vinedo->provincia) ?>
                                </p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="badge bg-success">Sincronizado</span>
                                    <?= Html::a("Ver Detalles", ["vinedo/view", "id" => $vinedo->id], ["class" => "btn btn-sm btn-outline-primary"]) ?>
                                </div>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
    <?= Html::a("+ Viñedo", ["vinedo/create"], ["class" => "fab fab-vinedo"]) ?>
    <?= Html::a("+ Muestra", ["muestra/create"], ["class" => "fab fab-muestra"]) ?>
</div>