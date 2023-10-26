import { lang, loading } from '$lib/stores';
import rosetta from 'rosetta';
import { get } from 'svelte/store';
// import en from './locales/en';
// import es from './locales/es';

loading.set(true);

const i18n = rosetta({
	en: {
		title: {
			fillDataForReport: 'Fill the data for the report',
			profile: 'Profile',

			createCar: 'Create Car',
			createUser: 'Create User',
			createDriver: 'Create Driver',
			createGroup: 'Create Group',
			createRequest: 'Create Request',
			createSituation: 'Create Situation',
			createCarSituation: 'Create Car Situation',
			createDriverSituation: 'Create Driver Situation',
			createProgram: 'Create Program',
			createSpecificProgram: 'Create Specific Program',

			editCar: 'Edit Car',
			editUser: 'Edit User',
			editDriver: 'Edit Driver',
			editGroup: 'Edit Group',
			editRequest: 'Edit Request',
			editSituation: 'Edit Situation',
			editCarSituation: 'Edit Car Situation',
			editDriverSituation: 'Edit Driver Situation',
			editProgram: 'Edit Program',
			editSpecificProgram: 'Edit Specific Program',

			changePassword: 'Change Password',
			languageSelection: 'Language Selection',
			login: 'Login',
			users: 'Users',
			drivers: 'Drivers',
			cars: 'Cars',
			requests: 'Requests',
			groups: 'Groups',
			programs: 'Programs',
			specificPrograms: 'Specific Programs',
			situations: 'Situations',
			carSituations: 'Car Situations',
			driverSituations: 'Driver Situations'
		},
		label: {
			goToMainView: 'Go to main view',
			email: 'Email',
			remainingKM: 'Remaining kilometers',
			selectARequest: 'Select a request',
			administrator: 'Administrator',
			agent: 'Agent',
			support: 'Support',
			createOne: 'Create one',
			selectADate: 'Select a date',
			language: 'Language',
			copilot: 'Copilot',
			newPassword: 'New password',
			currentPassword: 'Current password',
			confirmPassword: 'Confirm password',
			date: 'Date',
			returnDate: 'Return date',
			situation: 'Situation',
			situationType: 'Situation type',
			situationName: 'Name of the situation',
			car: 'Car',
			car_driver: 'Car and driver',
			duration: 'Duration (days : hours : minutes)',
			distanceKM: 'Distance in KM',
			program: 'Program',
			description: 'Description',
			startsAt: 'Starts at',
			programName: 'Name of the program',
			group: 'Group',
			specificProgram: 'Specific program',
			startDate: 'Start date',
			touristAmount: 'Number of tourists',
			country: 'Country',
			driver: 'Driver',
			availableKM: 'Available kilometers',
			seatAmount: 'Number of seats',
			brand: 'Brand',
			plateNumber: 'Plate number',
			address: 'Address',
			licenseCategories: 'License categories',
			licenseCategory: 'License category',
			idNumber: 'Identity number',
			name: 'Name',
			passwordConfirmation: 'Confirm Password',
			role: 'Role',
			username: 'Username',
			password: 'Password',
			users: 'Users',
			drivers: 'Drivers',
			cars: 'Cars',
			groups: 'Groups',
			requests: 'Requests',
			programs: 'Programs',
			specificPrograms: 'Specific Programs',
			situations: 'Situations',
			carSituations: 'Car Situations',
			driverSituations: 'Driver Situations',
			reports: {
				item: 'Reports',
				driversList: 'Drivers List',
				carsList: 'Cars List',
				requestOnDate: 'Requests on date',
				carSituations: 'Car Situations',
				driverSituations: 'Driver Situations',
				carDriverRelation: 'Car-Driver relation list',
				dragsList: 'Drags List',
				routingSheets: 'Routing Sheet',
				requestModifications: 'Request Modifications'
			}
		},
		placeholder: {
			email: 'email',
			request: 'request',
			language: 'language',
			copilot: 'copilot',
			newPassword: 'new password',
			currentPassword: 'current password',
			confirmPassword: 'confirm password',
			car: 'car',
			situation: 'situation',
			situationType: 'situation type',
			situationName: 'situation name',
			days: 'days',
			hours: 'hours',
			minutes: 'minutes',
			distanceKM: 'distance in km',
			program: 'program',
			description: 'description',
			programName: 'program name',
			group: 'group',
			specificProgram: 'specific program',
			startDate: 'start date',
			touristAmount: 'number of tourists',
			country: 'country',
			driver: 'driver',
			availableKM: 'available kilometers',
			seatAmount: 'number of seats',
			brand: 'brand',
			licenseCategory: 'license category',
			plateNumber: 'plate number',
			address: 'address',
			idNumber: 'identity number',
			name: 'name',
			passwordConfirmation: 'confirm password',
			role: 'role',
			username: 'username',
			password: 'password',
			search: 'search'
		},
		button: {
			lang: 'Lang',
			changePassword: 'Change password',
			login: 'Login',
			logout: 'Logout',
			insert: 'Insert',
			yes: 'Yes',
			no: 'No',
			submit: 'Submit',
			cancel: 'Cancel'
		},
		flashes: {
			youNeedToLoginAgain: 'You need to login again',
			noModificationsForRequest: 'There are no modifications of this request',
			invalidEmail: 'Invalid email',
			noRequestsForReport: 'There are no requests for the report',
			noDriversToCreateRequest: 'There are no drivers to create a request',
			noProgramsToCreateRequest: 'There are no programs to create a request',
			noCarsToCreateRequest: 'There are no Cars to create a request',
			noSpecificProgramsToCreateRequest: 'There are no Specific Programs to create a request',
			noGroupsToCreateRequest: 'There are no Groups to create a request',
			noDataForThisReport: 'No data for this report',
			noDriverSituationsForReport: 'There are no Driver Situations for the report',
			noCarSituationsForReport: 'There are no Car Situations for the report',
			noCarsForReport: 'There are no Cars for the report',
			noDriversForReport: 'There are no Drivers for the report',
			noProgramsToCreateSpecificProgramFrom: 'No Programs to create pecific program from',
			noProgramsToEditSpecificProgramFrom: 'No programs to create specific program from',
			noDriverToAssignToCar: 'No Driver to assign to Car',
			invalidPlateNumber: 'Invalid plate number, should start with a letter followed by 6 digits',
			noCarsToCreateSituations: 'There are no Cars to create situations from',
			noCarsToEditSituations: 'There are no Cars to edit situations from',
			noDriversToCreateSituations: 'There are no Drivers to create situations from',
			noDriversToEditSituations: 'There are no drivers to edit situations from',
			noSituationTypesToCreateSituations: 'There are no situation types to create situations from',
			noSituationTypesToEditSituations: 'There are no situation types to edit situations from',
			created: 'Successfully created',
			deleted: 'Successfully deleted',
			updated: 'Successfully updated',
			passwordChanged: 'Password successfully updated',
			invalidID: 'Invalid ID number',
			passwordsMustMatch: 'Passwords must match'
		},

		table: {
			header: {
				modification_datetime: 'Modification date',
				modified_key: 'Modified attribute',
				old_value: 'Old Value',
				new_value: 'New Value',
				end_time: 'Ends at',
				email: 'Email',
				driver_flat: 'Driver',
				copilot_flat: 'Copilot',
				driver_name: 'Driver name',
				duration_flat: 'Duration',
				car_flat: 'Car',
				role_i18n: 'Role',
				role: 'Role',
				username: 'Username',
				license_categories_flat: 'License categories',
				date: 'Date',
				return_date: 'Return date',
				description: 'Description',
				situation_type_i18n: 'Situation type',
				start: 'Starts at',
				duration: 'Duration',
				km: 'Kilometers',
				license_categories: 'Categories',
				situation_name: 'Situation name',
				situation_type: 'Situation type',
				program_name: 'Program name',
				category: 'Category',
				plate_number: 'Plate number',
				brand: 'Brand',
				license: 'License',
				seat_amount: 'Seat amount',
				available_km: 'Available KM',
				id_number: 'ID number',
				name: 'Name',
				license_category: 'License category',
				address: 'Address',
				tourist_amount: 'Tourist amount',
				country: 'Country'
			}
		},
		error: {
			'00000': 'Invalid plate number format',
			'00001': 'Invalid plate number length',
			'00002': 'Invalid brand length',
			'00004': 'Invalid brand characters',
			'00005': 'Invalid seat amount, cannot be negative',
			'00006': 'Invalid seat amount',
			'00007': 'Invalid available kilometers',
			'00008': 'Invalid situation name length',
			'00010': 'Invalid situation name characters',
			'00011': 'Invalid ID card',
			'00012': 'Invalid name length',
			'00014': 'Invalid name characters',
			'00015': 'Invalid address length',
			'00018': 'Invalid country, please select a country from the list',
			'00021': 'Invalid tourist amount, cannot be negative',
			'00022': 'Invalid tourist amount',
			'00023': 'Invalid program name length',
			'00028': 'Invalid description length',
			'00031': 'Invalid duration',
			'00032': 'Invalid kilometers',
			'00033': 'Invalid username length',
			'00035': 'Invalid username characters',
			'00036': 'User already registered',
			'00037': 'User not found',
			'00038': 'Car not found',
			'00039': 'Situation not found',
			'00040': 'Invalid credentials',
			'00041': 'Insufficient permissions',
			'00042': 'Driver not found',
			'00043': 'Driver situation not found',
			'00044': 'Group not found',
			'00045': 'Program not found',
			'00046': 'Incorrect username or password',
			'00047': 'The user belonging to this token no longer exist',
			'00048': 'Please provide refresh token',
			'00049': 'Please provide CSRF refresh token',
			'00050':
				"Car can't be deleted because it has a future request that can't be assigned to another car",
			'00051':
				"Driver can't be deleted because he has a future request that can't be assigned to another car",
			'00052':
				"Driver can't be deleted because he has a future request that can't be assigned to another driver",
			'00053': 'Specific program not found',
			'00054': 'This specific program is used on incoming requests. Please cancel them',
			'00055': 'Group already has a request on this date',
			'00056': 'No car available for this request',
			'00057': 'No copilot available for this request',
			'00058': 'Request not found',
			'00059': 'The driver is the current driver of a car',
			'00060': 'Something went wrong',
			'00061': 'Wrong password',
			'00062': 'This situation is being used',
			'00063': 'Program can not be deleted because it has a specific program on use',
			'00064': "Tourist amount is greater than the group's tourist amount",
			'00065': 'Can not create a request in the past',
			'00066': 'Driver does not have the required category',
			'99999': 'Can not delete yourself'
		},
		misc: {
			days: 'Days',
			noData: 'No Data to display',
			noEntriesFound: 'No entries found',
			delete: 'delete',
			areYouSure: 'Are you sure?',
			areYouSureYouWantTo: (obj: any) => `Are you sure you want to ${obj.action} ${obj.target}?`
		}
	}
});

i18n.set('es', {
	title: {
		fillDataForReport: 'Rellene los datos necesarios para el reporte',
		profile: 'Perfil',

		createCar: 'Crear Carro',
		createUser: 'Crear Usuario',
		createDriver: 'Crear Conductor',
		createGroup: 'Crear Grupo',
		createRequest: 'Crear Solicitud',
		createSituation: 'Crear Situación',
		createCarSituation: 'Crear Situación de Carro',
		createDriverSituation: 'Crear Situación de Conductor',
		createProgram: 'Crear Programa',
		createSpecificProgram: 'Crear Programa Específico',

		editCar: 'Editar Carro',
		editUser: 'Editar Usuario',
		editDriver: 'Editar Conductor',
		editGroup: 'Editar Grupo',
		editRequest: 'Editar Solicitud',
		editSituation: 'Editar Situación',
		editCarSituation: 'Editar Situación de Carro',
		editDriverSituation: 'Editar Situación de Conductor',
		editProgram: 'Editar Programa',
		editSpecificProgram: 'Editar Programa Específico',

		changePassword: 'Cambiar Contraseña',
		languageSelection: 'Selección de idioma',

		login: 'Iniciar sesión',
		users: 'Usuarios',
		drivers: 'Conductores',
		cars: 'Carros',
		requests: 'Solicitudes',
		groups: 'Grupos',
		programs: 'Programas',
		specificPrograms: 'Programas específicos',
		situations: 'Situaciones',
		carSituations: 'Situaciones del carro',
		driverSituations: 'Situaciones del conductor'
	},
	label: {
		goToMainView: 'Ir a la vista principal',
		email: 'Correo',
		remainingKM: 'Kilómetros restantes',
		selectARequest: 'Seleccione una solicitud',
		administrator: 'Administrador',
		agent: 'Agente',
		support: 'Soporte',
		createOne: 'Crear uno',
		selectADate: 'Seleccione una fecha',
		language: 'Idioma',
		copilot: 'Copiloto',
		newPassword: 'Nueva contraseña',
		currentPassword: 'Contraseña actual',
		confirmPassword: 'Confirmar contraseña',
		date: 'Fecha',
		returnDate: 'Fecha de retorno',
		situation: 'Situación',
		situationType: 'Tipo de situación',
		situationName: 'Nombre de la situación',
		car: 'Carro',
		car_driver: 'Carro y conductor',
		duration: 'Duración (días : horas : minutos)',
		distanceKM: 'Distancia en KM',
		program: 'Programa',
		description: 'Descripción',
		startsAt: 'Empieza a la(s)',
		programName: 'Nombre del programa',
		group: 'Grupo',
		specificProgram: 'Programa específico',
		startDate: 'Fecha de inicio',
		touristAmount: 'Cantidad de turistas',
		country: 'País',
		driver: 'Conductor',
		availableKM: 'Kilómetros disponibles',
		seatAmount: 'Cantidad de asientos',
		brand: 'Marca',
		plateNumber: 'Número de matrícula',
		address: 'Dirección',
		licenseCategories: 'Categorías de licencia',
		licenseCategory: 'Categoría de licencia',
		idNumber: 'Carnet de identidad',
		name: 'Nombre',
		passwordConfirmation: 'Confirmar Contraseña',
		role: 'Rol',
		username: 'Nombre de usuario',
		password: 'Contraseña',
		users: 'Usuarios',
		drivers: 'Conductores',
		cars: 'Carros',
		groups: 'Grupos',
		requests: 'Solicitudes',
		programs: 'Programas',
		specificPrograms: 'Programas específicos',
		situations: 'Situaciones',
		carSituations: 'Situaciones del carro',
		driverSituations: 'Situaciones del conductor',
		reports: {
			item: 'Reportes',
			driversList: 'Listado de conductores',
			carsList: 'Listado de carros',
			requestOnDate: 'Solicitudes de una fecha',
			carSituations: 'Situaciones de los carros',
			driverSituations: 'Situaciones de los conductores',
			carDriverRelation: 'Relación carro-conductor',
			dragsList: 'Listado de arrastres',
			routingSheets: 'Hoja de ruta',
			requestModifications: 'Modificaciones de solicitud'
		}
	},
	placeholder: {
		email: 'correo',
		request: 'solicitud',
		language: 'idioma',
		copilot: 'copiloto',
		newPassword: 'nueva contraseña',
		currentPassword: 'contraseña actual',
		confirmPassword: 'confirmar contraseña',
		car: 'carro',
		situation: 'situación',
		situationType: 'tipo de situación',
		situationName: 'nombre de la situación',
		days: 'días',
		hours: 'horas',
		minutes: 'minutos',
		distanceKM: 'distancia en km',
		program: 'programa',
		description: 'descripción',
		programName: 'nombre del programa',
		group: 'grupo',
		specificProgram: 'programa específico',
		startDate: 'start date',
		touristAmount: 'cantidad de turistas',
		country: 'país',
		driver: 'conductor',
		availableKM: 'kilómetros disponibles',
		seatAmount: 'cantidad de asientos',
		brand: 'marca',
		licenseCategory: 'categoría de licencia',
		plateNumber: 'número de matrícula',
		address: 'dirección',
		idNumber: 'carnet de identidad',
		name: 'nombre',
		passwordConfirmation: 'confirmar contraseña',
		role: 'rol',
		username: 'nombre de usuario',
		password: 'contraseña',
		search: 'search'
	},
	button: {
		lang: 'Leng',
		changePassword: 'Cambiar contraseña',
		login: 'Iniciar sesión',
		logout: 'Cerrar sesión',
		insert: 'Insertar',
		yes: 'Sí',
		no: 'No',
		submit: 'Enviar',
		cancel: 'Cancelar'
	},
	flashes: {
		youNeedToLoginAgain: 'Necesita autenticarse nuevamente',
		noModificationsForRequest: 'Esta solicitud no ha sido modificada',
		invalidEmail: 'Correo inválido',
		noRequestsForReport: 'No hay solicitudes para el reporte',
		noDriversToCreateRequest: 'No hay conductores para crear una solicitud',
		noProgramsToCreateRequest: 'No hay programas para crear una solicitud',
		noCarsToCreateRequest: 'No hay Coches para crear una solicitud',
		noSpecificProgramsToCreateRequest: 'No hay programas específicos para crear una solicitud',
		noGroupsToCreateRequest: 'No hay grupos para crear una solicitud',
		noDataForThisReport: 'No hay datos para este reporte',
		noDriverSituationsForReport: 'No existen situaciones de conductores para este reporte',
		noCarSituationsForReport: 'No existen situaciones de coches para este reporte',
		noCarsForReport: 'No existen coches para este reporte',
		noDriversForReport: 'No existen conductores para este reporte',
		noProgramsToCreateSpecificProgramFrom:
			'No hay programas con los que crear programas específicos',
		noProgramsToEditSpecificProgramFrom:
			'No hay programas con los que editar programas específicos',
		noDriverToAssignToCar: 'No hay conductores para asignar al carro',
		invalidPlateNumber:
			'Número de matrícula inválido, debe comenzar con una letra seguida por 6 dígitos',
		noCarsToCreateSituations: 'No hay carros para crear situaciones',
		noCarsToEditSituations: 'No hay carros para editar situaciones',
		noDriversToCreateSituations: 'No hay conductores para crear situaciones',
		noDriversToEditSituations: 'No hay conductores para editar situaciones',
		noSituationTypesToCreateSituations: 'No hay tipos de situaciones para crear situaciones',
		noSituationTypesToEditSituations: 'No hay tipos de situaciones para editar situaciones',
		created: 'Creado satisfactoriamente',
		deleted: 'Eliminado satisfactoriamente',
		updated: 'Actualizado satisfactoriamente',
		passwordChanged: 'Contraseña actualizada satisfactoriamente',
		invalidID: 'Número de carnet de identidad inválido',
		passwordsMustMatch: 'Las contraseñas deben coincidir'
	},
	table: {
		header: {
			modification_datetime: 'Fecha de modificación',
			modified_key: 'Atributo modificado',
			old_value: 'Valor anterior',
			new_value: 'Nuevo valor',
			end_time: 'Termina a la(s)',
			email: 'Correo',
			driver_flat: 'Conductor',
			copilot_flat: 'Copiloto',
			car_flat: 'Coche',
			driver_name: 'Nombre del conductor',
			duration_flat: 'Duración',
			role_i18n: 'Rol',
			role: 'Rol',
			username: 'Nombre de usuario',
			license_categories_flat: 'Categorías de licencia',
			date: 'Fecha',
			return_date: 'Fecha de retorno',
			situation_type_i18n: 'Tipo de situación',
			description: 'Descripción',
			start: 'Comienza a la(s)',
			duration: 'Duración',
			km: 'Kilómetros',
			license_categories: 'Categorías',
			situation_name: 'Nombre de la situación',
			situation_type: 'Tipo de situación',
			program_name: 'Nombre del programa',
			category: 'Categoría',
			plate_number: 'Número de matrícula',
			brand: 'Marca',
			license: 'Licencia',
			seat_amount: 'Cantidad de asientos',
			available_km: 'KM Disponibles',
			id_number: 'Carnet',
			name: 'Nombre',
			license_category: 'Licencia',
			address: 'Dirección',
			tourist_amount: 'Cantidad de turistas',
			country: 'País'
		}
	},
	error: {
		'00000': 'Formato de número de matrícula inválido',
		'00001': 'Longitud de número de matrícula inválida',
		'00002': 'Longitud de marca inválida',
		'00004': 'Caracteres de marca inválidos',
		'00005': 'Cantidad de asiento inválido, no puede ser negativo',
		'00006': 'Cantidad del asiento inválido',
		'00007': 'Kilómetros disponibles inválidos',
		'00008': 'Longitud del nombre de situación inválida',
		'00010': 'Caracteres del nombre de situación inválidos',
		'00011': 'Carnet de identidad inválido',
		'00012': 'Longitud del nombre inválida',
		'00014': 'Caracteres del nombre inválidos',
		'00015': 'Longitud de dirección inválida',
		'00018': 'País inválido, por favor selecciona un país de la lista',
		'00021': 'Cantidad de turistas inválida, no puede ser negativa',
		'00022': 'Cantidad de turistas inválida',
		'00023': 'Longitud del nombre del programa inválida',
		'00028': 'Longitud de la descripción inválida',
		'00031': 'Duración inválida',
		'00032': 'Kilómetros inválidos',
		'00033': 'Longitud del nombre de usuario inválida',
		'00035': 'Caracteres del nombre de usuario inválidos',
		'00036': 'Usuario ya registrado',
		'00037': 'Usuario no encontrado',
		'00038': 'Coche no encontrado',
		'00039': 'Situación no encontrada',
		'00040': 'Credenciales inválidas',
		'00041': 'Permisos insuficientes',
		'00042': 'Conductor no encontrado',
		'00043': 'Situación del conductor no encontrada',
		'00044': 'Grupo no encontrado',
		'00045': 'Programa no encontrado',
		'00046': 'Nombre de usuario o contraseña incorrecta',
		'00047': 'El usuario perteneciente a este token ya no existe',
		'00048': 'Por favor, proporcione un token de actualización',
		'00049': 'Please provide CSRF refresh token',
		'00050':
			'El coche no se puede eliminar porque tiene una solicitud futura que no se puede asignar a otro coche',
		'00051':
			'El conductor no se puede eliminar porque tiene una solicitud futura que no se puede asignar a otro coche',
		'00052':
			'El conductor no puede ser borrado porque tiene una solicitud futura que no puede ser asignada a otro conductor',
		'00053': 'Programa específico no encontrado',
		'00054': 'Este programa específico se utiliza en solicitudes entrantes. Por favor, cancélelas',
		'00055': 'El grupo ya tiene una solicitud en esta fecha',
		'00056': 'No hay coche disponible para esta solicitud',
		'00057': 'No hay copiloto disponible para esta solicitud',
		'00058': 'Solicitud no encontrada',
		'00059': 'El conductor es el conductor actual de un coche',
		'00060': 'Algo salió mal',
		'00061': 'Contraseña incorrecta',
		'00062': 'Esta situación está en uso',
		'00063': 'No se puede eliminar el programa porque tiene un programa específico en uso',
		'00064': 'La cantidad de turistas el mayor que el tamaño del grupo',
		'00065': 'No puede crear una solicitud en el pasado',
		'00066': 'El conductor no tiene la categoría necesaria',
		'99999': 'No se puede eliminar usted mismo'
	},
	misc: {
		days: 'Días',
		noData: 'Sin datos para mostrar',
		noEntriesFound: 'No se encontraron entradas',
		delete: 'eliminar',
		areYouSure: '¿Está seguro?',
		areYouSureYouWantTo: (obj: any) => `¿Está seguro que desea ${obj.action} a ${obj.target}?`
	}
});

i18n.locale(get(lang));

loading.set(false);

export default i18n;

export const getTranslatedHeader = (header: string) =>
	i18n.t(`table.header.${header}`) || `i18n - ${header}`;
