<?php
declare(strict_types=1);
require __DIR__ . '/app/bootstrap.php';
try {
    if($_SERVER['REQUEST_METHOD']!=='POST')json_response(405,['error'=>'Método no permitido.']);
    check_origin();admin(true);$d=body();
    if(($d['confirmation']??'')!=='DELETE')throw new ValidationError('Confirma la eliminación definitiva.');
    $id=txt($d['id']??'',80,true);
    $type=$d['type']??'';
    if(!in_array($type,['session','commissioned'],true))throw new ValidationError('Tipo de solicitud no válido.');
    $expected=txt($d['expected_status']??'',20,true);
    db()->beginTransaction();
    // Mismo orden de bloqueo que las confirmaciones de encargos.
    query('SELECT id FROM agenda_settings WHERE id=1 FOR UPDATE')->fetch();
    if($type==='commissioned'){
        $row=query('SELECT id,status FROM game_requests WHERE id=? FOR UPDATE',[$id])->fetch();
    }else{
        $initial=query('SELECT game_id FROM reservations WHERE id=?',[$id])->fetch();
        if($initial)query('SELECT id FROM games WHERE id=? FOR UPDATE',[$initial['game_id']])->fetch();
        $row=query('SELECT id,status FROM reservations WHERE id=? FOR UPDATE',[$id])->fetch();
    }
    if(!$row){db()->commit();json_response(200,['ok'=>true,'message'=>'La solicitud ya no existe.']);}
    if($row['status']!==$expected)throw new ValidationError('El estado ha cambiado. Actualiza los datos y revisa la solicitud antes de eliminarla.');
    if($type==='commissioned')query('DELETE FROM game_requests WHERE id=?',[$id]);
    else{
        query('DELETE FROM user_reservations WHERE reservation_id=?',[$id]);
        query('DELETE FROM reservations WHERE id=?',[$id]);
    }
    db()->commit();
    json_response(200,['ok'=>true,'message'=>'Solicitud eliminada definitivamente.']);
}catch(ValidationError $e){
    if(db()->inTransaction())db()->rollBack();
    json_response(400,['error'=>$e->getMessage()]);
}catch(Throwable $e){
    try{if(db()->inTransaction())db()->rollBack();}catch(Throwable $ignored){}
    error_log('Eliminar solicitud: '.get_class($e));
    json_response(500,['error'=>'No se pudo eliminar la solicitud. Revisa el registro del servidor.']);
}
