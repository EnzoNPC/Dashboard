//RFI TAG:driverName=HTML Widget

#setFile plugins/www/header.html
<script type="module" src="/dashboard/.{userName}./.{project}./.{userModule}./JS/switch.js"> </script>
#unSetFile

#setFile temp/header.html
<script type="module" src="./JS/switch.js"> </script>
#unSetFile

#setFile wwwroot/JS/switch.js
#newRFIcode(_WEB/API/Widgets/Switch/plugins/switch.js,name=)
#unSetFile

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Componente
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*RFI JSon
{
	'Nombre': 'switch',
	'NombreToolBox': 'Switch',
	'Tipo' : 'Widget',
	'title': 'when it receives a text string on the EMIC bus',
	'html-tag': 'emic-widget-switch'
}
*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Evento
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*RFI JSon
{
	'Nombre': 'switchToogle',
	'NombreToolBox': 'switchToogle',
	'Tipo' : 'SistemEvt',
	'title': 'when it receives a text string on the EMIC bus',
	'instancia':'{
		"NombreWorkBox": "Event.Switch.Toogle",
		"definir":"event_switchToogle_active",
		"parametros": [	{"value":"Switch","title":"Switch name "},{"value":"Value","title":"Switch value"}]
		}'
}
*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                                 Funciones
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

/*RFI JSon
{
	'Nombre': 'SwitchSetValue',
	'NombreToolBox': 'switchSetValue',
	'Tipo' : 'SistemFnc',
	'title': 'set switch value',

	'InnerHTML':"
		<div class='lineaDeCodigo' originalclass='funcion' originalid='SwitchSetValue' draggable='true' ondragstart='drag_linea(event)'>
			switch.setValue(<div class='parametroDiv'></div> , <div class='parametroDiv'></div>)
		</div>"
}
*/

function SwitchSetValue(switchName, Value) {
    var tName = switchName;
    if (switchName.includes('/')) {
        tName = switchName.substr(switchName.lastIndexOf('/') + 1);
    }

    // Intenta obtener el elemento del documento por su 'id'
    // El 'id' del elemento es 'switch-' seguido de 'tName'
    var element = document.getElementById(`switch-${tName}`);
    if (element) {
        // Si el elemento existe, le asigna el valor 'Value'
        element.value = Value;
    } 
    else {
        // Imprime un mensaje de error en la consola
        console.log("Switch con id switch-", tName, " no encontrado");
    }
}

