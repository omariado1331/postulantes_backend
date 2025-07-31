-- Tabla de postulantes
CREATE TABLE IF NOT EXISTS postulantes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    ci VARCHAR(20) UNIQUE NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(100) NOT NULL,
    direccion TEXT,
    fecha_postulacion DATE NOT NULL DEFAULT CURRENT_DATE,
    curriculum VARCHAR(255) NOT NULL, -- Cambiado a VARCHAR para almacenar la ruta del archivo
    estado VARCHAR(20) NOT NULL DEFAULT 'postulante' CHECK (
        estado IN ('postulante', 'adjudicado', 'notificado', 'contratado', 'descartado')
    )
);

-- Tabla de postulantes contratados
CREATE TABLE IF NOT EXISTS postulante_contratado (
    id SERIAL PRIMARY KEY,
    postulante_id INT NOT NULL,
    ci VARCHAR(20) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    correo VARCHAR(100) NOT NULL,
    direccion TEXT,
    fecha_contratacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50),
    adjudicacion VARCHAR(100),
    proceso VARCHAR(100),
    nro_contrato VARCHAR(50),
    estado VARCHAR(20) NOT NULL DEFAULT 'postulante_contratado' CHECK (
        estado IN ('adjudicado', 'notificado', 'contratado', 'descartado')
    ),

    -- Relaciones (foreign keys)
    CONSTRAINT fk_postulante_id FOREIGN KEY (postulante_id)
        REFERENCES postulantes(id)
        ON DELETE CASCADE,
);
