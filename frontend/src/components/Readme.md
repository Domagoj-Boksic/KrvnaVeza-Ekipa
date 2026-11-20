# components

Ova mapa sadrži dijelove koji sastavljaju cjelokupne stranice. 

## stil
imenovanje datotkea - PascalCasing<br>
podfolder - isto ime kao u 'pages/"x"', podjela po stranicama<br>
imenovanje u css - kebab-case<br>
poveznica s backendom u 'services/'<br>

## struktura
ProtectedRoute.jsx: komponenta koja "čuva" dijelove stranice koji nisu dostupni svima<br>
Layout.jsx: komponenta koja određuje osnovni izgled stranice, komponente u njoj će biti vidljive na svim stranicama<br>
/button<br>
Button.jsx: dinamička komponenta gumba koja prosljeđuje elemente:a, Link ili button ovisno o potrebi preko parametara<br>
Button.module.css: stil za Button<br>
/header<br>
Header.jsx: komponenta za header<br>
AdminDropdown.jsx: komponenta koja sadrži navigaciju za adminove stranice<br>
ProfileIcon.jsx: komponenta ikone profila zajedno s dropdownom za osnovnu navigaciju<br>
Header.module.css: stil za header<br>
/map<br>
MapView.jsx: komponenta za kartu, openstreetmap leaflet<br>
MapView.module.css: stil za kartu
/logo<br>
Logo.jsx: komponenta za logo, prikazuje potrebni logo pomoću propa variant ( auth i header za sada )<br>
Logo.module.css: osnovni stilovi za logo<br>
