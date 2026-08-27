# Prompt de implementación — Modernización del Footer de la Municipalidad Provincial de Maynas

## 1. Objetivo general

Modernizar el **footer del portal web de la Municipalidad Provincial de Maynas (MPM)** utilizando buenas prácticas actuales de diseño web, accesibilidad, diseño responsive y experiencia de usuario.

El footer actual funciona, pero presenta una apariencia antigua debido a:

- líneas decorativas demasiado largas;
- exceso de espacio vacío;
- jerarquía visual débil;
- enlaces agrupados de forma poco intuitiva;
- redes sociales sin una sección clara;
- poca presencia de identidad institucional;
- copyright en una franja inferior demasiado pequeña;
- falta de enlaces de accesibilidad y políticas;
- necesidad de mejorar la adaptación a tablet y móvil.

La modernización debe mantener una apariencia **institucional, sobria, limpia y confiable**, evitando diseños excesivamente comerciales.

---

## 2. Instrucción principal para el agente

Analiza primero la implementación actual del footer dentro del proyecto.

Antes de modificar:

1. Identifica el componente o archivo responsable del footer.
2. Identifica el framework y librerías que ya utiliza el proyecto.
3. Reutiliza componentes, estilos, iconos y dependencias existentes siempre que sea posible.
4. No agregues librerías nuevas si no son realmente necesarias.
5. Conserva las rutas y funcionalidades actualmente operativas.
6. No elimines enlaces funcionales existentes.
7. No modifiques otras partes de la web salvo que sea estrictamente necesario para integrar correctamente el footer.
8. Mantén el estilo visual de la Municipalidad Provincial de Maynas.
9. Evita romper el layout general del portal.
10. El resultado debe funcionar correctamente en escritorio, tablet y móvil.

---

# 3. Concepto visual

Utilizar como identidad principal:

- azul institucional;
- rojo institucional como color de acento;
- blanco para textos;
- tonos derivados del azul para separar visualmente áreas.

Evitar:

- glassmorphism;
- degradados exagerados;
- sombras grandes;
- animaciones innecesarias;
- exceso de iconos;
- colores ajenos a la identidad institucional.

El resultado debe transmitir:

> Institucional + moderno + accesible + limpio + confiable.

---

# 4. Nueva estructura del footer

Crear una estructura principal de **4 columnas en escritorio**.

## Columna 1 — Identidad institucional

Debe contener:

- logo o escudo institucional disponible en el proyecto;
- nombre:
  **Municipalidad Provincial de Maynas**;
- ubicación:
  **Iquitos · Loreto · Perú**;
- breve texto institucional, solo si visualmente funciona;
- sección de redes sociales.

Ejemplo conceptual:

```text
[LOGO]

MUNICIPALIDAD
PROVINCIAL DE MAYNAS

Iquitos · Loreto · Perú

Síguenos
[Facebook] [YouTube] [otras redes existentes]
```

No inventar redes sociales que actualmente no existan.

---

## Columna 2 — Municipalidad

Agrupar aquí:

- Ciudad
- Funcionarios
- Organigrama
- Estructura funcional
- Noticias
- COPROSEC

Usar las rutas actuales del proyecto.

---

## Columna 3 — Servicios al ciudadano

Dar mayor importancia visual a esta sección.

Agrupar:

- Mesa de partes
- Portal de Transparencia
- Libro de reclamaciones
- Convocatorias CAS

Si alguno de estos servicios tiene actualmente un nombre ligeramente diferente, conservar el nombre oficial utilizado por la web.

---

## Columna 4 — Contacto y enlaces

Incluir los elementos actualmente disponibles como:

- Contáctanos
- enlaces externos relevantes;
- SENCICO, si debe permanecer;
- directorio institucional, únicamente si existe;
- ubicación u horarios, únicamente si existe información real en el proyecto.

No inventar teléfonos, correos, direcciones o horarios.

---

# 5. Segunda franja del footer

Crear una zona inferior más discreta y ordenada.

Ejemplo:

```text
Política de privacidad · Accesibilidad · Términos de uso · Mapa del sitio

© 2026 Municipalidad Provincial de Maynas
Desarrollado por OSTI - MPM
```

## Importante

No dejar el año escrito manualmente.

Utilizar el año dinámico mediante la tecnología existente.

Ejemplo en React/JSX:

```jsx
{new Date().getFullYear()}
```

Adaptar el código al framework real del proyecto.

---

# 6. Tratamiento de los títulos

Eliminar el estilo actual basado en grandes líneas rojas horizontales.

No utilizar líneas decorativas que ocupen casi todo el ancho de las columnas.

Preferir:

```text
Municipalidad
────
```

o simplemente:

```text
Municipalidad
```

con:

- tipografía semibold;
- buena separación inferior;
- pequeño indicador rojo opcional;
- jerarquía clara.

El rojo debe actuar como **acento**, no como elemento dominante.

---

# 7. Colores

Antes de crear colores nuevos, buscar si el proyecto ya cuenta con:

- variables CSS;
- tema;
- Tailwind config;
- tokens de diseño;
- constantes de color.

Reutilizarlos.

Si no existen variables institucionales, tomar como referencia aproximada el footer actual.

Ejemplo conceptual:

```css
--footer-bg: #203a63;
--footer-bg-secondary: #182e50;
--footer-text: #ffffff;
--footer-muted: rgba(255, 255, 255, 0.75);
--footer-accent: #e31e24;
```

Estos valores son referenciales.

Si el proyecto ya posee colores oficiales, **usar los existentes**.

---

# 8. Tipografía

Mantener la tipografía global del proyecto.

No introducir otra familia tipográfica exclusivamente para el footer.

Tamaños orientativos:

```text
Nombre institucional: 20–22 px
Título de columna:     15–17 px
Enlaces:               14–16 px
Copyright:             13–14 px
Line-height:           1.5 aprox.
```

Priorizar legibilidad.

---

# 9. Enlaces

Todos los enlaces deben:

- mantener su ruta actual;
- ser claramente identificables;
- tener `hover`;
- tener `focus-visible`;
- permitir navegación por teclado;
- conservar contraste suficiente;
- utilizar un área clicable cómoda.

Ejemplo conceptual:

```css
.footer-link {
  color: rgba(255, 255, 255, 0.82);
  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.footer-link:hover {
  color: #fff;
  text-decoration: underline;
}

.footer-link:focus-visible {
  outline: 2px solid #fff;
  outline-offset: 4px;
}
```

Adaptar a la solución de estilos existente.

---

# 10. Redes sociales

Las redes sociales no deben permanecer flotando en medio del footer sin contexto.

Crear:

```text
Síguenos

[icono] [icono] [icono]
```

Requisitos:

- reutilizar los iconos existentes;
- no inventar cuentas;
- botones de aproximadamente 40–44 px si el diseño lo permite;
- usar `aria-label`;
- añadir hover/focus;
- no mostrar únicamente un icono sin nombre accesible.

Ejemplo:

```html
<a
  href="..."
  aria-label="Facebook de la Municipalidad Provincial de Maynas"
>
```

---

# 11. Accesibilidad

El footer debe aproximarse a criterios **WCAG 2.2 AA**.

Revisar especialmente:

## Contraste

- texto normal: contraste mínimo recomendado 4.5:1;
- texto grande: mínimo recomendado 3:1.

## Navegación por teclado

Todos los enlaces y botones deben mostrar un foco visible.

## Iconos

Todo botón que solo muestre un icono debe contar con:

```html
aria-label="..."
```

## Semántica

Utilizar preferentemente:

```html
<footer>
<nav>
<ul>
<li>
<a>
```

cuando corresponda.

Agregar títulos accesibles cuando sea necesario.

Evitar estructuras basadas únicamente en `<div>` si existen elementos semánticos más apropiados.

---

# 12. Responsive design

## Desktop

Usar una distribución similar a:

```text
IDENTIDAD | MUNICIPALIDAD | SERVICIOS | CONTACTO
```

Preferentemente mediante:

```css
display: grid;
```

o la solución equivalente del framework.

Ejemplo conceptual:

```css
grid-template-columns: 1.3fr 1fr 1fr 1fr;
```

---

## Tablet

Pasar aproximadamente a:

```text
IDENTIDAD       MUNICIPALIDAD
SERVICIOS       CONTACTO
```

Es decir:

**2 columnas × 2 filas**.

---

## Móvil

Apilar:

```text
IDENTIDAD

MUNICIPALIDAD

SERVICIOS

CONTACTO

LEGAL
```

No permitir:

- overflow horizontal;
- columnas demasiado estrechas;
- textos cortados;
- botones superpuestos;
- redes sociales fuera de pantalla.

---

# 13. Espaciado

Aplicar un sistema de espaciado consistente.

Evitar el exceso de aire que existe actualmente.

Referencia:

```text
Padding vertical footer:       48–64 px desktop
                               32–40 px móvil

Gap columnas:                  32–48 px

Separación título/enlaces:     16–20 px

Separación enlaces:            8–12 px
```

Adaptarlo al sistema de diseño existente.

---

# 14. Chatbot flotante

Existe un botón flotante de chatbot en la esquina inferior izquierda.

Revisar que:

- no cubra enlaces del footer;
- no cubra la información legal;
- no se superponga con elementos en móvil;
- mantenga margen respecto de los bordes;
- no perjudique la navegación mediante teclado.

Referencia:

```css
bottom: 24px;
left: 24px;
```

No modificar su lógica funcional salvo que sea necesario para evitar superposición.

---

# 15. Footer inferior

Eliminar visualmente la franja negra excesivamente contrastante si actualmente existe.

Utilizar preferentemente un tono más oscuro del propio azul institucional.

Ejemplo:

```text
Footer principal: azul institucional
Footer legal:     azul institucional más oscuro
```

La transición debe sentirse parte del mismo componente.

---

# 16. Información legal

Si las páginas correspondientes ya existen, incluir:

- Política de privacidad
- Accesibilidad
- Términos de uso
- Mapa del sitio

## Regla importante

Si esas páginas **NO existen**, no crear enlaces falsos ni rutas inexistentes.

En ese caso:

- dejar preparada la estructura de forma limpia;
- incluir únicamente enlaces reales;
- informar en el resumen final cuáles no se agregaron porque no existen.

---

# 17. Contenido existente que debe conservarse

Actualmente existen elementos como:

- Ciudad
- Funcionarios
- Organigrama
- Noticias
- COPROSEC
- Estructura funcional
- SENCICO
- Contrataciones CAS
- Libro de reclamaciones
- Mesa de partes
- Portal de Transparencia
- Contáctanos
- Facebook
- YouTube
- enlace/app adicional existente

Estos elementos deben conservarse mientras sigan siendo válidos dentro del proyecto.

Se permite reorganizarlos para mejorar la experiencia de usuario.

---

# 18. Cosas que NO debes hacer

No:

- reconstruyas todo el sitio;
- modifiques el header;
- cambies rutas existentes;
- elimines enlaces funcionales;
- inventes datos institucionales;
- agregues contenido ficticio;
- instales una gran librería solo para el footer;
- introduzcas animaciones llamativas;
- utilices emojis como iconos oficiales;
- agregues degradados innecesarios;
- utilices estilos inline si el proyecto cuenta con una arquitectura de estilos establecida;
- dupliques CSS que ya existe;
- rompas la vista móvil;
- conviertas todo en componentes nuevos si no aporta valor;
- modifiques el funcionamiento del chatbot salvo por motivos de layout.

---

# 19. Buenas prácticas de implementación

Priorizar:

- componentes reutilizables;
- HTML semántico;
- CSS mantenible;
- bajo acoplamiento;
- responsividad;
- accesibilidad;
- reutilización de rutas;
- reutilización del sistema de iconos;
- reutilización del sistema de colores;
- mínimo impacto sobre otros componentes.

Si el proyecto utiliza React, evita crear lógica innecesaria.

Los grupos de navegación pueden definirse mediante estructuras de datos cuando ayude a reducir repetición.

Ejemplo conceptual:

```js
const footerSections = [
  {
    title: "Municipalidad",
    links: [...]
  },
  {
    title: "Servicios al ciudadano",
    links: [...]
  }
];
```

No aplicar esta estructura si vuelve el código innecesariamente complejo.

---

# 20. Criterios visuales de aceptación

El trabajo se considera visualmente correcto si:

- [ ] El footer ya no se percibe anticuado.
- [ ] Tiene una jerarquía clara.
- [ ] La identidad de la Municipalidad es visible.
- [ ] Las grandes líneas rojas desaparecieron o fueron reducidas considerablemente.
- [ ] Los enlaces están agrupados de forma lógica.
- [ ] Los servicios ciudadanos tienen buena visibilidad.
- [ ] Las redes sociales cuentan con una sección propia.
- [ ] La franja inferior se integra con el footer.
- [ ] El copyright es legible.
- [ ] No existe espacio vacío excesivo.
- [ ] Se ve correctamente en 1920 px.
- [ ] Se ve correctamente en 1366 px.
- [ ] Se ve correctamente en tablet.
- [ ] Se ve correctamente en móvil.
- [ ] El chatbot no tapa contenido.

---

# 21. Criterios técnicos de aceptación

- [ ] No existen errores en consola provocados por la modificación.
- [ ] No existen rutas rotas.
- [ ] No existen imports sin utilizar.
- [ ] No existen assets inexistentes.
- [ ] No existe overflow horizontal.
- [ ] El año se genera automáticamente.
- [ ] Los enlaces pueden recorrerse con teclado.
- [ ] Existe `focus-visible`.
- [ ] Los iconos sin texto cuentan con nombre accesible.
- [ ] Se utilizan etiquetas semánticas cuando corresponde.
- [ ] No se agregaron dependencias innecesarias.
- [ ] El build del proyecto continúa funcionando.
- [ ] No se afectaron componentes ajenos al footer.

---

# 22. Validación responsive

Probar como mínimo:

```text
1920 × 1080
1440 × 900
1366 × 768
1024 × 768
768 × 1024
430 × 932
390 × 844
360 × 800
```

Comprobar:

- salto de columnas;
- alineación;
- wrapping de textos;
- márgenes;
- enlaces;
- botones;
- redes sociales;
- chatbot;
- copyright;
- ausencia de scroll horizontal.

---

# 23. Resultado visual esperado

Referencia conceptual:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  [LOGO]                     MUNICIPALIDAD      SERVICIOS       CONTACTO     │
│  MUNICIPALIDAD PROVINCIAL                                                  │
│  DE MAYNAS                  Ciudad             Mesa de partes  Contáctanos │
│                             Funcionarios       Transparencia   Enlaces     │
│  Iquitos · Loreto · Perú    Organigrama        Reclamos                     │
│                             Estructura          Convocatorias               │
│  Síguenos                   Noticias                                        │
│  ○ Facebook ○ YouTube       COPROSEC                                        │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│ Privacidad · Accesibilidad · Términos · Mapa del sitio                     │
│                                                                             │
│ © [AÑO] Municipalidad Provincial de Maynas        Desarrollado por OSTI-MPM│
└─────────────────────────────────────────────────────────────────────────────┘
```

Este esquema es conceptual.

No debe copiarse de forma rígida si la arquitectura actual permite una solución visual mejor.

---

# 24. Prioridad de trabajo

## Prioridad alta

1. Reestructurar el layout.
2. Incorporar identidad institucional.
3. Agrupar correctamente los enlaces.
4. Mejorar responsive.
5. Mejorar accesibilidad.
6. Mejorar jerarquía y legibilidad.

## Prioridad media

7. Mejorar redes sociales.
8. Refinar hover/focus.
9. Mejorar el footer legal.
10. Corregir espaciado.

## Prioridad baja

11. Microinteracciones sutiles.

---

# 25. Entrega del agente

Al terminar:

1. Implementa directamente los cambios necesarios.
2. Indica qué archivos modificaste.
3. Resume brevemente los cambios realizados.
4. Indica cualquier enlace que no hayas podido incorporar porque su ruta no existe.
5. Confirma si ejecutaste build/lint/tests.
6. Reporta cualquier problema encontrado.
7. No devuelvas únicamente una propuesta visual: **realiza la implementación en el código existente**.

---

# 26. Criterio final

La modernización no consiste en agregar más elementos.

El objetivo es que el footer sea:

> **más claro, más útil, más accesible, más institucional y visualmente contemporáneo**, manteniendo la identidad actual de la Municipalidad Provincial de Maynas y sin romper funcionalidades existentes.
