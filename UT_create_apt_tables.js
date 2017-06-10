CREATE TABLE t_apartment (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_apartment_name varchar(100)  NOT NULL,
  c_apartment_username varchar(100) NOT NULL,
  c_apartment_password varchar(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(c_apartment_username)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE t_flat (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_flat_name varchar(100)  NOT NULL,
  c_flat_apartment_id int(11) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (c_flat_name, c_flat_apartment_id),
  CONSTRAINT fk_apartment_id FOREIGN KEY (c_flat_apartment_id)
  REFERENCES t_apartment(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE t_user (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_user_name varchar(100)  NOT NULL,
  c_user_password varchar(100) NOT NULL,
  c_is_flat_associated int NOT NULL,
  c_user_flat_id int(11),
  PRIMARY KEY (id),
  UNIQUE (c_user_name, c_user_password),
  UNIQUE (c_user_flat_id),
  CONSTRAINT fk_flat_id FOREIGN KEY (c_user_flat_id)
  REFERENCES t_flat(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE t_service (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_service_name varchar(100)  NOT NULL,
  c_product_id int,
  PRIMARY KEY (id),
  UNIQUE (c_service_name)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE t_bill (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_user_id int(11)  NOT NULL,
  c_amount DECIMAL(13, 2) NOT NULL,
  c_service_id int(11) NOT NULL,
  c_from DATE NOT NULL,
  c_to DATE NOT NULL, 
  c_is_paid int NOT NULL, 
  c_t_id int(11), 
  PRIMARY KEY (id),
  CONSTRAINT fk_user_id FOREIGN KEY (c_user_id)
  REFERENCES t_user(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  CONSTRAINT fk_service_id FOREIGN KEY (c_service_id)
  REFERENCES t_service(id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE t_admin (
  id int(11) NOT NULL AUTO_INCREMENT,
  c_admin_username varchar(100)  NOT NULL,
  c_admin_password varchar(100) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(c_admin_username)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

insert into t_admin (c_admin_username, c_admin_password) values ("polo", "polo");
