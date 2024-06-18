//RFI TAG:driverName=SYSTEM

/*RFI JSon
{
	'Nombre': 'INIVAR',
	'NombreToolBox': 'initVar',
	'Tipo' : 'SistemEvt',
	'title': 'When the module is powered up or reset',
	'ReturnInfo': {'type':'','tooltip':'nothing'},
	'parameters': [],
	'instancia':'{
		"NombreWorkBox": "Event.SYSTEM.initVar",
		"definir":"event_INIVAR_active",
		"parametros": []
		}'
}
*/
/*RFI JSon
{
	'Nombre': 'INICIO',
	'NombreToolBox': 'initMod',
	'Tipo' : 'SistemEvt',
	'title': 'When the module and all its functions are ready',
	'ReturnInfo': {'type':'','tooltip':'nothing'},
	'parameters': [],
	'instancia':'{
		"NombreWorkBox": "Event.SYSTEM.initMod",
		"definir":"event_INICIO_active",
		"parametros": []
		}'
}
*/
/*xRFI JSon
{
	'Nombre': 'resetCpu',
	'NombreToolBox': 'reset',
	'Tipo' : 'SistemFnc',
	'title': 'Reset the system',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_resetCpu_function' originalclass='funcion' originalid='resetCpu' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.reset()
		</div>"
}
*/

/*xRFI JSon
{
	'Nombre': 'clrWdt',
	'NombreToolBox': 'restartWatchDog',
	'Tipo' : 'SistemFnc',
	'title': 'Reset the watchdog of system',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_clrWdt_function' originalclass='funcion' originalid='clrWdt' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.restartWatchDog()
		</div>"
}
*/

/*xRFI JSon
{
	'Nombre': 'setupWdt',
	'NombreToolBox': 'watchDogEnable',
	'Tipo' : 'SistemFnc',
	'title': 'Set status the watchdog of system (1-enabled, 0-disable)',
	'returnInfo': {'type':'','tooltip':'Nothing'},
	'parameters': [{'name': 'status',
					'tooltip': 'Select status of watchdog',
					'required': 'true"',
					'type': 'list'}
				  ],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_setupWdt_function' originalclass='funcion' originalid='setupWdt' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.watchDogEnable(<div class='parametroDiv' title='1-enable | 0-disable' div>)
		</div>"
}
*/

/*xRFI JSon
{
	'Nombre': 'gStRstCse',
	'NombreToolBox': 'resetSource',
	'Tipo' : 'SistemFnc',
	'title': 'Returns the source of reset',
	'returnInfo': {'type':'enum','tooltip':'Value representing the source of reset'},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_restartCause_function' originalclass='funcion' originalid='gStRstCse' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.ResetSource()
		</div>"
}
*/


/*RFI JSon
{
	'Nombre': 'save',
	'NombreToolBox': 'saveVar',
	'Tipo' : 'SistemFnc',
	'title': 'Save the value of the variables started with a capital letter (Ex: Weight)',
	'returnInfo': {'type':'','tooltip':''},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_save_function' originalclass='funcion' originalid='save' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.saveVar()
		</div>"
}
*/

/*RFI JSon
{
	'Nombre': 'load',
	'NombreToolBox': 'loadVar',
	'Tipo' : 'SistemFnc',
	'title': 'Restores the value of previously saved variables',
	'returnInfo': {'type':'','tooltip':''},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_load_function' originalclass='funcion' originalid='load' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.loadVar()
		</div>"
}
*/

/*RFI JSon
{
	'Nombre': 'execute',
	'NombreToolBox': 'execute',
	'Tipo' : 'SistemFnc',
	'title': 'Execute command',
	'returnInfo': {'type':'','tooltip':''},
	'parameters': [],
	'InnerHTML':"
		<div class='lineaDeCodigo' definir='use_execute_function' originalclass='funcion' originalid='execute' draggable='true' ondragstart='drag_linea(event)'>
			SYSTEM.execute(<div class='parametroDiv'></div>)
		</div>"
}
*/

//-----------------------------------------------------------------------------------
// Llama al evento INICIO 
//-----------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
	if (typeof INICIO === 'function') {
	  INICIO(); 
	}
  });