Użyjemy:
- liba Express pod API (/healthcheck + /calculate + /drawlines)
- Socket.io (podtrzymanie połączenia included) - pod rysowanie punktów z czujnika

Na frontendzie - układ wspołrzędnych ustawiamy na punkt 0,0 (trzeba zrobić translacje z odwracaniem osi itd)
Skorzystamy z funkcji trygonometrycznych do zamiany kąta i dystansu na punkty

![[Pasted image 20250119103612.png]]

Zakładając że Orzeł 1 znajduje się w danym momencie na współrzędnych $(x, y)$
to zmierzony punkt znajduje się na współrzednych $(x_{p}, x_{p})$ :

$$
x_{p} = x + \cos(\alpha) * d
$$
$$
y_{p} = y + \sin(\alpha) * d
$$
Orzeł oblicza swoje położenie za pomocą magnetometru i drugiej zwróconej wartości, zaczyna z $(0,0)$ otrzymuje on informacje o zmianach (co $\Delta_t$)



## Workspace

3 folderki 
- test runner - UDP sender
- socket/processing server - przetwarzanie danych przekazywanie na frontend
- frontend - odbieranie danych - rysowanie punktów 

