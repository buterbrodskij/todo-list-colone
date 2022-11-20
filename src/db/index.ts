const openRequest = indexedDB.open(process.env.VUE_APP_DB_NAME, process.env.VUE_APP_DB_VERSION);


openRequest.onupgradeneeded = function(event) {
  console.log(openRequest);
  // версия существующей базы данных меньше 2 (или база данных не существует)
  const db = openRequest.result;
  switch(event.oldVersion) { // существующая (старая) версия базы данных
  case 0:
    // версия 0 означает, что на клиенте нет базы данных
    // выполнить инициализацию
  case 1:
    // на клиенте версия базы данных 1
    // обновить
  }
};

openRequest.onsuccess = function() {
  const db = openRequest.result;

  db.onversionchange = function() {
    db.close();
    alert('База данных устарела, пожалуйста, перезагрузите страницу.');
  };

  // ...база данных готова, используйте ее...
};

