PGDMP     .    '                 {         
   Tarea_2_BD    15.2    15.2 B    P           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Q           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            R           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            S           1262    17411 
   Tarea_2_BD    DATABASE        CREATE DATABASE "Tarea_2_BD" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "Tarea_2_BD";
                postgres    false                        2615    18502    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            T           0    0    SCHEMA public    COMMENT         COMMENT ON SCHEMA public IS '';
                   postgres    false    5            U           0    0    SCHEMA public    ACL     +   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
                   postgres    false    5            �            1259    18503    _prisma_migrations    TABLE     �  CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);
 &   DROP TABLE public._prisma_migrations;
       public         heap    postgres    false    5            �            1259    18764    defensas    TABLE     f   CREATE TABLE public.defensas (
    id integer NOT NULL,
    defensa character varying(45) NOT NULL
);
    DROP TABLE public.defensas;
       public         heap    postgres    false    5            �            1259    26464    defensas_del_reino    TABLE     �   CREATE TABLE public.defensas_del_reino (
    id_defensa integer NOT NULL,
    id_reino integer NOT NULL,
    fecha_comienzo timestamp(3) without time zone NOT NULL
);
 &   DROP TABLE public.defensas_del_reino;
       public         heap    postgres    false    5            �            1259    18763    defensas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.defensas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.defensas_id_seq;
       public          postgres    false    227    5            V           0    0    defensas_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.defensas_id_seq OWNED BY public.defensas.id;
          public          postgres    false    226            �            1259    18545    diplomacias    TABLE     �   CREATE TABLE public.diplomacias (
    id_reino_1 integer NOT NULL,
    id_reino_2 integer NOT NULL,
    es_aliado boolean NOT NULL
);
    DROP TABLE public.diplomacias;
       public         heap    postgres    false    5            �            1259    18532    karts    TABLE     �   CREATE TABLE public.karts (
    id integer NOT NULL,
    modelo character varying(45) NOT NULL,
    color character varying(45) NOT NULL,
    "kartId" integer,
    velocidad_maxima integer
);
    DROP TABLE public.karts;
       public         heap    postgres    false    5            �            1259    18531    karts_id_seq    SEQUENCE     �   CREATE SEQUENCE public.karts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.karts_id_seq;
       public          postgres    false    221    5            W           0    0    karts_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.karts_id_seq OWNED BY public.karts.id;
          public          postgres    false    220            �            1259    18580    personaje_habita_reino    TABLE     �   CREATE TABLE public.personaje_habita_reino (
    id_personaje integer NOT NULL,
    id_reino integer NOT NULL,
    fecha_registro timestamp(3) without time zone NOT NULL,
    es_gobernante boolean NOT NULL
);
 *   DROP TABLE public.personaje_habita_reino;
       public         heap    postgres    false    5            �            1259    18519    personaje_tiene_trabajo    TABLE     �   CREATE TABLE public.personaje_tiene_trabajo (
    id_trabajo integer NOT NULL,
    id_personaje integer NOT NULL,
    fecha_inicio timestamp(3) without time zone NOT NULL,
    fecha_termino timestamp(3) without time zone
);
 +   DROP TABLE public.personaje_tiene_trabajo;
       public         heap    postgres    false    5            �            1259    18513 
   personajes    TABLE     �   CREATE TABLE public.personajes (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    fuerza integer NOT NULL,
    fecha_nacimiento timestamp(3) without time zone NOT NULL,
    objeto character varying(30)
);
    DROP TABLE public.personajes;
       public         heap    postgres    false    5            �            1259    18512    personajes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.personajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.personajes_id_seq;
       public          postgres    false    216    5            X           0    0    personajes_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.personajes_id_seq OWNED BY public.personajes.id;
          public          postgres    false    215            �            1259    18539    reinos    TABLE     �   CREATE TABLE public.reinos (
    id integer NOT NULL,
    nombre character varying(45) NOT NULL,
    ubicacion character varying(45) NOT NULL,
    superficie integer NOT NULL
);
    DROP TABLE public.reinos;
       public         heap    postgres    false    5            �            1259    18538    reinos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.reinos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.reinos_id_seq;
       public          postgres    false    223    5            Y           0    0    reinos_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.reinos_id_seq OWNED BY public.reinos.id;
          public          postgres    false    222            �            1259    18525    trabajos    TABLE     �   CREATE TABLE public.trabajos (
    id integer NOT NULL,
    descripcion character varying(45) NOT NULL,
    sueldo integer NOT NULL
);
    DROP TABLE public.trabajos;
       public         heap    postgres    false    5            �            1259    18524    trabajos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.trabajos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.trabajos_id_seq;
       public          postgres    false    219    5            Z           0    0    trabajos_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.trabajos_id_seq OWNED BY public.trabajos.id;
          public          postgres    false    218            �           2604    18767    defensas id    DEFAULT     j   ALTER TABLE ONLY public.defensas ALTER COLUMN id SET DEFAULT nextval('public.defensas_id_seq'::regclass);
 :   ALTER TABLE public.defensas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    227    226    227            �           2604    18535    karts id    DEFAULT     d   ALTER TABLE ONLY public.karts ALTER COLUMN id SET DEFAULT nextval('public.karts_id_seq'::regclass);
 7   ALTER TABLE public.karts ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221            �           2604    18516    personajes id    DEFAULT     n   ALTER TABLE ONLY public.personajes ALTER COLUMN id SET DEFAULT nextval('public.personajes_id_seq'::regclass);
 <   ALTER TABLE public.personajes ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    18542 	   reinos id    DEFAULT     f   ALTER TABLE ONLY public.reinos ALTER COLUMN id SET DEFAULT nextval('public.reinos_id_seq'::regclass);
 8   ALTER TABLE public.reinos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    223    223            �           2604    18528    trabajos id    DEFAULT     j   ALTER TABLE ONLY public.trabajos ALTER COLUMN id SET DEFAULT nextval('public.trabajos_id_seq'::regclass);
 :   ALTER TABLE public.trabajos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    219    219            ?          0    18503    _prisma_migrations 
   TABLE DATA           �   COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
    public          postgres    false    214   qP       L          0    18764    defensas 
   TABLE DATA           /   COPY public.defensas (id, defensa) FROM stdin;
    public          postgres    false    227   qS       M          0    26464    defensas_del_reino 
   TABLE DATA           R   COPY public.defensas_del_reino (id_defensa, id_reino, fecha_comienzo) FROM stdin;
    public          postgres    false    228   T       I          0    18545    diplomacias 
   TABLE DATA           H   COPY public.diplomacias (id_reino_1, id_reino_2, es_aliado) FROM stdin;
    public          postgres    false    224   aT       F          0    18532    karts 
   TABLE DATA           N   COPY public.karts (id, modelo, color, "kartId", velocidad_maxima) FROM stdin;
    public          postgres    false    221   �T       J          0    18580    personaje_habita_reino 
   TABLE DATA           g   COPY public.personaje_habita_reino (id_personaje, id_reino, fecha_registro, es_gobernante) FROM stdin;
    public          postgres    false    225   �T       B          0    18519    personaje_tiene_trabajo 
   TABLE DATA           h   COPY public.personaje_tiene_trabajo (id_trabajo, id_personaje, fecha_inicio, fecha_termino) FROM stdin;
    public          postgres    false    217   �U       A          0    18513 
   personajes 
   TABLE DATA           R   COPY public.personajes (id, nombre, fuerza, fecha_nacimiento, objeto) FROM stdin;
    public          postgres    false    216   �U       H          0    18539    reinos 
   TABLE DATA           C   COPY public.reinos (id, nombre, ubicacion, superficie) FROM stdin;
    public          postgres    false    223   �V       D          0    18525    trabajos 
   TABLE DATA           ;   COPY public.trabajos (id, descripcion, sueldo) FROM stdin;
    public          postgres    false    219   �W       [           0    0    defensas_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.defensas_id_seq', 18, true);
          public          postgres    false    226            \           0    0    karts_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.karts_id_seq', 6, true);
          public          postgres    false    220            ]           0    0    personajes_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.personajes_id_seq', 13, true);
          public          postgres    false    215            ^           0    0    reinos_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.reinos_id_seq', 7, true);
          public          postgres    false    222            _           0    0    trabajos_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.trabajos_id_seq', 9, true);
          public          postgres    false    218            �           2606    18511 *   _prisma_migrations _prisma_migrations_pkey 
   CONSTRAINT     h   ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);
 T   ALTER TABLE ONLY public._prisma_migrations DROP CONSTRAINT _prisma_migrations_pkey;
       public            postgres    false    214            �           2606    26468 *   defensas_del_reino defensas_del_reino_pkey 
   CONSTRAINT     z   ALTER TABLE ONLY public.defensas_del_reino
    ADD CONSTRAINT defensas_del_reino_pkey PRIMARY KEY (id_defensa, id_reino);
 T   ALTER TABLE ONLY public.defensas_del_reino DROP CONSTRAINT defensas_del_reino_pkey;
       public            postgres    false    228    228            �           2606    18769    defensas defensas_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.defensas
    ADD CONSTRAINT defensas_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.defensas DROP CONSTRAINT defensas_pkey;
       public            postgres    false    227            �           2606    18549    diplomacias diplomacias_pkey 
   CONSTRAINT     n   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_pkey PRIMARY KEY (id_reino_1, id_reino_2);
 F   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_pkey;
       public            postgres    false    224    224            �           2606    18537    karts karts_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT karts_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.karts DROP CONSTRAINT karts_pkey;
       public            postgres    false    221            �           2606    18584 2   personaje_habita_reino personaje_habita_reino_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_pkey PRIMARY KEY (id_personaje, id_reino);
 \   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_pkey;
       public            postgres    false    225    225            �           2606    18523 4   personaje_tiene_trabajo personaje_tiene_trabajo_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_pkey PRIMARY KEY (id_trabajo, id_personaje);
 ^   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_pkey;
       public            postgres    false    217    217            �           2606    18518    personajes personajes_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.personajes
    ADD CONSTRAINT personajes_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.personajes DROP CONSTRAINT personajes_pkey;
       public            postgres    false    216            �           2606    18544    reinos reinos_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.reinos
    ADD CONSTRAINT reinos_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.reinos DROP CONSTRAINT reinos_pkey;
       public            postgres    false    223            �           2606    18530    trabajos trabajos_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.trabajos
    ADD CONSTRAINT trabajos_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.trabajos DROP CONSTRAINT trabajos_pkey;
       public            postgres    false    219            �           2606    26469 5   defensas_del_reino defensas_del_reino_id_defensa_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.defensas_del_reino
    ADD CONSTRAINT defensas_del_reino_id_defensa_fkey FOREIGN KEY (id_defensa) REFERENCES public.defensas(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 _   ALTER TABLE ONLY public.defensas_del_reino DROP CONSTRAINT defensas_del_reino_id_defensa_fkey;
       public          postgres    false    228    3237    227            �           2606    26474 3   defensas_del_reino defensas_del_reino_id_reino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.defensas_del_reino
    ADD CONSTRAINT defensas_del_reino_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 ]   ALTER TABLE ONLY public.defensas_del_reino DROP CONSTRAINT defensas_del_reino_id_reino_fkey;
       public          postgres    false    228    223    3231            �           2606    18565 '   diplomacias diplomacias_id_reino_1_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_1_fkey FOREIGN KEY (id_reino_1) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_1_fkey;
       public          postgres    false    3231    224    223            �           2606    18570 '   diplomacias diplomacias_id_reino_2_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.diplomacias
    ADD CONSTRAINT diplomacias_id_reino_2_fkey FOREIGN KEY (id_reino_2) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 Q   ALTER TABLE ONLY public.diplomacias DROP CONSTRAINT diplomacias_id_reino_2_fkey;
       public          postgres    false    224    223    3231            �           2606    18575    karts karts_kartId_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.karts
    ADD CONSTRAINT "karts_kartId_fkey" FOREIGN KEY ("kartId") REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE SET NULL;
 C   ALTER TABLE ONLY public.karts DROP CONSTRAINT "karts_kartId_fkey";
       public          postgres    false    216    3223    221            �           2606    18585 ?   personaje_habita_reino personaje_habita_reino_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 i   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_personaje_fkey;
       public          postgres    false    225    216    3223            �           2606    18590 ;   personaje_habita_reino personaje_habita_reino_id_reino_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_habita_reino
    ADD CONSTRAINT personaje_habita_reino_id_reino_fkey FOREIGN KEY (id_reino) REFERENCES public.reinos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 e   ALTER TABLE ONLY public.personaje_habita_reino DROP CONSTRAINT personaje_habita_reino_id_reino_fkey;
       public          postgres    false    223    3231    225            �           2606    18550 A   personaje_tiene_trabajo personaje_tiene_trabajo_id_personaje_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey FOREIGN KEY (id_personaje) REFERENCES public.personajes(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 k   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_personaje_fkey;
       public          postgres    false    216    217    3223            �           2606    18555 ?   personaje_tiene_trabajo personaje_tiene_trabajo_id_trabajo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.personaje_tiene_trabajo
    ADD CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey FOREIGN KEY (id_trabajo) REFERENCES public.trabajos(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 i   ALTER TABLE ONLY public.personaje_tiene_trabajo DROP CONSTRAINT personaje_tiene_trabajo_id_trabajo_fkey;
       public          postgres    false    3227    217    219            ?   �  x���]n\7��ǫ�d�O�Et.(JBHl����/�N��]�b��q�sx��u,��(c��\@M'���D��h�ŕ[���жv߃Q�f��Ms�^_���������d+P�ޑ��v+ /�P�"�U:����r����y�b�֚\/⍐W&eR�Ez�2Ƥ�꬛h�p?����\)�h�;X���x�^�fV��mᔱ<kY� ��~�M���ӏ����n������|SaI~�E]g	� :� �S��`7�)q���n؜	g�Ԋ`C�񄍡�ʻ�G��U��Wd������s�.B���z�&�0P-�i.چ'~��=��+2`��$ᙷV����p0k�X|ʂz�عي�>K���A�x����������x�%a�d"��J�.��hV���NK�[�d���=+����(����m�iJn������3 f���{��@&!k�$-"Le��e�a-�Lz:E�Zs*)�B`�l0kf0�v[:�^�����_���<��>�T�mr_|g�px\����o�����ˏ��o���.�^e���*��"W�̩�.-g��\�g5>��S�2,&��0#;����)��xT���t�G��Jl���v����������q�O������+Kdy��B29�����Cݽ�J]�W�q7�ӂ �A��Ԑy_�vO�H#�P�k�)���8����(�߉��VQ��:��X�����co*�{�c�~������my�      L   �   x�u�A
�0F���)�bQZ�V!A�(���� �1#mJ�X�������%g��b��w�kJ�#���|B.�#��9�m�k�mh0q3Ơ��4� �+[:��*:�����9X~�^˛/+f�A�/?      M   P   x�M��� ߗ*h �B���љ}�f�E!5Oʞh���,�g�$�>�Q��G��A�����������'�MD.��'      I      x�3�4�,�2�4�f@�̎���� El�      F   X   x�3���/�Wp�I��KM/��4�442�2���$�$q�g�s�qp�r�����&�@�M�:��S�S�Fp��qqq �]x      J   �   x�eлAИ����\�
ܿ�/4�ӌF80�^󋼈K#�kO���c�u �z�)���jq��n֩VD�r��rP�[cf��7{kά�lT�^�:ٺ�f���b�c��%����7���z�=7      B   ]   x�M��� �d
p�$@i���?G�Bɯ��4�`T�	�#�M����}+��+�����?ip�+��	�n��<
��5�t���`��      A   �   x�m��J�0��'O���$�4���q!�0�C�@�gH+^�����L����Ο�Xx���:�!X���^b�G�7��S��)�� �B���E#�.��z�P�E��D%3x�\�Ze����9Q<�*4*�r9+<��s����	Za�1>�X���s��S�ש�-��>>̾&�~��N	�pEy|�gr�6��5\��XY����2V�]��"��e���Rcj���߅G*���0�9��p!����a      H   �   x�-�A
�0EדS��Z�l7�u� n;�h:S�h�X���i$��̯�@�E7N�������KPcTG�#��Rt�hO7d�e&V��F�HN��z�Ô��[�����6z,����4�V���^�Q
2�wl^�,�R_x�7�      D   v   x�3�t��+I�K-��00�2�t,*,�,IM.��44��p��f&*��^[\��Qg��TR�ih�r��&^��UHIU�N,*)�44 �Xp��$��)$�V�s��c���� ��#�     