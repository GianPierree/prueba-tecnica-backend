-- database/init.sql

-- 1. Crear Tabla Authors
CREATE TABLE IF NOT EXISTS authors (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crear Tabla Themes
CREATE TABLE IF NOT EXISTS themes (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Crear Tabla Jokes
CREATE TABLE IF NOT EXISTS jokes (
  id VARCHAR(36) PRIMARY KEY, -- UUID generado por PostgreSQL
  content TEXT NOT NULL,
  author_id INTEGER REFERENCES authors(id),
  theme_id INTEGER REFERENCES themes(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. SEEDING (Carga de datos iniciales)
-- Insertar Autores (si no existen)
INSERT INTO authors (id, name) VALUES 
  (1, 'Manolito'),
  (2, 'Pepe'),
  (3, 'Isabel'),
  (4, 'Pedro')
ON CONFLICT (id) DO NOTHING;

-- Insertar Themes (si no existen)
INSERT INTO themes (id, name) VALUES 
  (1, 'humor negro'),
  (2, 'humor amarillo'),
  (3, 'chistes verdes')
ON CONFLICT (id) DO NOTHING;

-- 5. Insertar Chistes
INSERT INTO jokes (id, content, author_id, theme_id) VALUES
  -- AUTOR 1: MANOLITO
  -- Theme 1: Humor Negro
  (gen_random_uuid()::text, '— Mamá, mamá, en el colegio me llaman huérfano. — ¿Mamá? ¡¡Mamá!!', 1, 1),
  (gen_random_uuid()::text, '— Doctor, ¿cuánto me queda de vida? — 10... — ¿10 qué? ¿Años, meses? — 9, 8, 7...', 1, 1),
  (gen_random_uuid()::text, 'Se abre el telón y se ve un cementerio lleno de melones. ¿Cómo se llama la película? Melone en paz.', 1, 1),
  -- Theme 2: Humor Amarillo
  (gen_random_uuid()::text, '— ¡Soldado! ¡Ice la bandera! — Pues le ha quedado muy bonita mi sargento.', 1, 2),
  (gen_random_uuid()::text, '— Papá, ¿qué se siente tener un hijo tan guapo? — No sé hijo, pregúntale a tu abuelo.', 1, 2),
  (gen_random_uuid()::text, '— ¿Cuál es el colmo de un calvo? Tener ideas descabelladas.', 1, 2),
  -- Theme 3: Chistes Verdes
  (gen_random_uuid()::text, '— ¿Bailamos? — Claro. — ¿Pero quién saca a mi amiga? — Ah, seguridad, ¡seguridad!', 1, 3),
  (gen_random_uuid()::text, 'Una manzana le dice a otra: — ¡Qué verde estás! — Es que me maduraron a palos.', 1, 3),
  (gen_random_uuid()::text, 'El semáforo le dice al coche: — No me mires que me estoy cambiando.', 1, 3),

  -- AUTOR 2: PEPE
  -- Theme 1: Humor Negro
  (gen_random_uuid()::text, '— Oye, tu mujer se ha caído por la ventana. — ¡Qué pena! Con lo que me gustaba esa maceta.', 2, 1),
  (gen_random_uuid()::text, '— Cariño, estás obsesionado con el fútbol y me haces falta. — ¡¿Falta?! ¡Si ni te he tocado!', 2, 1),
  (gen_random_uuid()::text, '— Papá, ¿qué es la crisis? — Es cuando tienes mucho mes al final del sueldo.', 2, 1),
  -- Theme 2: Humor Amarillo
  (gen_random_uuid()::text, '— ¿Por qué los buzos se tiran hacia atrás? — Porque si se tiraran hacia adelante caerían dentro del barco.', 2, 2),
  (gen_random_uuid()::text, '— ¡Rápido, necesitamos sangre! — Yo soy 0 positivo. — Pues muy mal, ¡aquí se viene a ser optimista!', 2, 2),
  (gen_random_uuid()::text, 'Dos mosquitos en moto: — ¡Oye, para, que se me ha metido una mosca en el ojo!', 2, 2),
  -- Theme 3: Chistes Verdes
  (gen_random_uuid()::text, '— ¿Te gusta el trío? — Sí, claro. — Pues corre para casa, que igual llegas a tiempo.', 2, 3),
  (gen_random_uuid()::text, '— Cariño, apaga la luz que te voy a dar un castigo. — ¿Me vas a pegar? — No, te voy a dejar a oscuras.', 2, 3),
  (gen_random_uuid()::text, 'Entra una señora a la carnicería: — Déme un pepino. — Señora, esto es una carnicería. — Ah, perdone, es que soy daltónica.', 2, 3),

  -- AUTOR 3: ISABEL
  -- Theme 1: Humor Negro
  (gen_random_uuid()::text, '— Mi abuelo murió tranquilo mientras dormía. Los que gritaban eran los pasajeros de su autobús.', 3, 1),
  (gen_random_uuid()::text, '— ¿Nivel de inglés? — Alto. — Traduzca juguete. — Toy. — Úselo en una frase. — Toy triste.', 3, 1),
  (gen_random_uuid()::text, 'Anuncio: Se vende paracaídas. Solo un uso, nunca abierto.', 3, 1),
  -- Theme 2: Humor Amarillo
  (gen_random_uuid()::text, '¿Qué le dice un techo a otro? Techo de menos.', 3, 2),
  (gen_random_uuid()::text, '¿Qué hace una abeja en el gimnasio? ¡Zum-ba!', 3, 2),
  (gen_random_uuid()::text, '¿Cómo se llama el campeón de buceo japonés? Tokofondo. ¿Y el subcampeón? Kasitoko.', 3, 2),
  -- Theme 3: Chistes Verdes
  (gen_random_uuid()::text, '— Oye, ¿tú follas? — ¡Qué ordinario! Se dice: ¿tú tienes relaciones sexuales? — Bueno, ¿tú tienes relaciones sexuales? — No, yo follo.', 3, 3),
  (gen_random_uuid()::text, 'La lechuga al tomate: — Tócame que me pongo colorado.', 3, 3),
  (gen_random_uuid()::text, '— Pepe, ¿te has fijado que la vecina tiene un pecho más grande que el otro? — Sí, y tiene un marido más tonto que el otro.', 3, 3),

  -- AUTOR 4: PEDRO
  -- Theme 1: Humor Negro
  (gen_random_uuid()::text, '— Cariño, dame al bebé. — Espera a que llore. — ¿Por qué? — Porque no sé dónde lo he dejado.', 4, 1),
  (gen_random_uuid()::text, '— Mamá, ¿puedo tirarme a la piscina? — Mejor no hijo, que no hay agua.', 4, 1),
  (gen_random_uuid()::text, '— Amor, si me tocara la lotería, ¿me querrías igual? — Sí, pero te echaría mucho de menos.', 4, 1),
  -- Theme 2: Humor Amarillo
  (gen_random_uuid()::text, '— ¿Qué hace un perro con un taladro? Taladrando.', 4, 2),
  (gen_random_uuid()::text, '— ¿Sabes cómo se deja a un tonto intrigado? (Silencio)...', 4, 2),
  (gen_random_uuid()::text, 'Había una vez un hombre tan pequeño, tan pequeño, que se subió a una canica y dijo: ¡El mundo es mío!', 4, 2),
  -- Theme 3: Chistes Verdes
  (gen_random_uuid()::text, '¿Qué es una orgía agrícola? Donde entran dos nabos y salen dos calabazas.', 4, 3),
  (gen_random_uuid()::text, '¿Cuál es la diferencia entre una pila y un hombre? Que la pila tiene un lado positivo.', 4, 3),
  (gen_random_uuid()::text, '— ¿Me da un condón? — ¿Para llevar? — No, para aquí, ¡tengo prisa!', 4, 3);

-- Ajustar secuencias después de inserción manual
SELECT setval('authors_id_seq', (SELECT MAX(id) FROM authors));
SELECT setval('themes_id_seq', (SELECT MAX(id) FROM themes));