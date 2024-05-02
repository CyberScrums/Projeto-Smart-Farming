
create database DadosEstufa;
use DadosEstufa;
create table dados
( dado_cod int primary key auto_increment,
DiaSemana varchar(50),
Dia_Mes_Ano varchar(50),
Hora varchar(50),
UmidadeSolo varchar(50),
UmidadeAmbiente varchar(50),
Temperatura varchar(50),
VolumeAgua varchar(50));

ALTER TABLE dados MODIFY UmidadeSolo Float;
ALTER TABLE dados MODIFY UmidadeAmbiente Float;
ALTER TABLE dados MODIFY Temperatura Float;
ALTER TABLE dados MODIFY VolumeAgua Float;

