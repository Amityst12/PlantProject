--���� �������
CREATE TABLE user(
    id INT AUTO_INCREMENT PRIMARY KEY, --���� ������ ��� �����, ���� ��������
    username VARCHAR(50) NOT NULL, --�� ������
    password CHAR(60) NOT NULL, --����� ������(hash), �� 60 �����
    email VARCHAR(100) NOT NULL, --����� ����, ������� ����� ����
    phone VARCHAR(20), --���� ����� ������ ��������
    role ENUM('admin', 'manager', 'student', 'guest') NOT NULL, --����� ������ ������
  
);

--���� �����
CREATE TABLE building(
    id INT AUTO_INCREMENT PRIMARY KEY, --���� ������ ��� ����, ���� ��������
    name VARCHAR(100) NOT NULL , --�� �����, ������ ����� ���

);

--���� �����
CREATE TABLE floor(
    id INT AUTO_INCREMENT PRIMARY KEY, --���� ������ ��� ����, ���� ��������
    number INT NOT NULL, --���� �����
    building_id INT NOT NULL, --����� �� ����� ����� ����� �����
    FOREIGN KEY(building_id)              --����� ���� ��
    REFERENCES building(id)              --����� ����� building
    ON DELETE CASCADE                    -- ����� ������ �������� �� ����� ����
);

--���� �����
CREATE TABLE room(
    id INT AUTO_INCREMENT PRIMARY KEY, --���� ������ ��� ���, ���� ��������
    name VARCHAR(50) NOT NULL, --�� ����
    room_type ENUM('class', 'storage', 'office', 'lab', 'toilet') NOT NULL, --��� ����
    floor_id INT NOT NULL, --����� �� ����� ����� ���� ����
    FOREIGN KEY(floor_id)                 --����� ���� ��
    REFERENCES floor(id)                 --����� ����� floor
    ON DELETE CASCADE                    -- ����� ����� �������� �� ����� ����
);

CREATE TABLE sensor(
    id INT AUTO_INCREMENT PRIMARY KEY,

    serial_number      VARCHAR(100) NOT NULL UNIQUE COMMENT '���� ������ ������',
    model              VARCHAR(50)  NOT NULL       COMMENT '��� ������',
    manufacturer       VARCHAR(50)  NOT NULL       COMMENT '���� ������',
    type               VARCHAR(50)  NOT NULL       COMMENT '��� ������ (����, ��������, ����� ���\')',
    name               VARCHAR(100) NOT NULL       COMMENT '�� ������',
    unit               VARCHAR(20)  NOT NULL       COMMENT '����� ���� (�C, %, ppm ���\')',

    status             ENUM('active', 'inactive', 'error', 'maintenance')
    NOT NULL DEFAULT 'active' COMMENT '��� �����',

    installed_at       DATE         NOT NULL       COMMENT '����� �����',
    last_maintenance   DATE                       COMMENT '������ ������',

    room_id            INT          NOT NULL       COMMENT '���� ���',

    --����� ���� ���� ����(������)
    x_coord            DECIMAL(6, 2) NULL           COMMENT '����� X ���� ���� (�����)',
    y_coord            DECIMAL(6, 2) NULL           COMMENT '����� Y ���� ���� (�����)',

    --����� ���� ���� ����� �����(���� ������ �� ��� ������ ����)
    x_percent          DECIMAL(5, 2) NULL           COMMENT '���� ����� X ���� ���� ������',
    y_percent          DECIMAL(5, 2) NULL           COMMENT '���� ����� Y ���� ���� ������',

    --��� ����
    FOREIGN KEY(room_id) REFERENCES room(id) ON DELETE CASCADE
);







