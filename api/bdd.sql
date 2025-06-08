CREATE TABLE IF NOT EXISTS `page` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `bloc_number` INT(8) NOT NULL,
    `page_id` INT(11) DEFAULT NULL,
    `slug` VARCHAR(250) NOT NULL DEFAULT "",
    `title` VARCHAR(250) NOT NULL DEFAULT "",
    `description` VARCHAR(250) NOT NULL DEFAULT "",
    `type` VARCHAR(55) NOT NULL DEFAULT "page",
    PRIMARY KEY (`id`),
    FOREIGN KEY (`page_id`) REFERENCES `page` (`id`) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS `picture_group` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",           
    `card_number` int(8)  NOT NULL , 
    `is_grid` boolean,   
    `type` varchar(55)  NOT NULL default "picture_group",     
    `width` int(11)  NOT NULL default 21,
    `height` int(11)  NOT NULL default 250,
    `gap` int(11)  NOT NULL default 30,
    `text` text NOT NULL default "", 
    `bloc_number` int(11)  NOT NULL ,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `picture_group_data` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",          
    `type` varchar(55)  NOT NULL default "picture_group_data",     
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` text  NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "",     
    `text_color` varchar(250)  NOT NULL default "",     
    `card_number` int(11)  NOT NULL,   
    `is_data_button` boolean default false,  
    `picture_group_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`picture_group_id`) REFERENCES picture_group(`id`) ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS `button` (

    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",  
    `type` varchar(55)  NOT NULL default "button", 
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` varchar(250)  NOT NULL default "",   
    `button_text` varchar(55)  NOT NULL default "",
    `is_parallaxe` boolean default false,        
    `background_color` varchar(250)  NOT NULL default "",              
    `card_number` int(8)  NOT NULL , 
    `width` int(11)  NOT NULL default 21,
    `height` int(11)  NOT NULL default 250,
    `gap` int(11)  NOT NULL default 30,
    `bloc_number` int(11)  NOT NULL ,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `carousel` (

    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",  
    `type` varchar(55)  NOT NULL default "carousel",           
    `carousel_type` varchar(55)  NOT NULL default "carousel",   
    `card_number` int(8)  NOT NULL , 

    `width` int(11)  NOT NULL default 21,
    `height` int(11)  NOT NULL default 25,
    `gap` int(11)  NOT NULL default 30,

    `bloc_number` int(11)  NOT NULL ,
    `page_id` int(11)  NOT NULL,
     PRIMARY KEY  (`id`),
     FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
  );
CREATE TABLE IF NOT EXISTS `carousel_data` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",          
    `type` varchar(55)  NOT NULL default "carousel_data",     
    `href_url` varchar(250)  NOT NULL default "",  
    `image_url` varchar(250)  NOT NULL default "",     
    `text` varchar(250)  NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "",     
    `text_color` varchar(250)  NOT NULL default "",     
    `card_number` int(11)  NOT NULL,   
    `carousel_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`carousel_id`) REFERENCES carousel(`id`) ON DELETE CASCADE
  );
/*Table structure for table `parallaxe` */

CREATE TABLE IF NOT EXISTS `parallaxe` (
    `id` int(11) NOT NULL auto_increment,  
    `title` varchar(250)  NOT NULL default "", 

    `type` varchar(55)  NOT NULL default "parallaxe",           
    `image_url` varchar(250)  NOT NULL default "",     
    `alt_image` varchar(250)  NOT NULL default "",     
    `bloc_number` int(11)  NOT NULL,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);
/*Table structure for table `text_picture` */

CREATE TABLE IF NOT EXISTS `text_picture` (
    `id` int(11) NOT NULL auto_increment,  
    `title` varchar(250)  NOT NULL default "", 
    `type` varchar(55)  NOT NULL default "text_picture",           
    `show_picture` boolean default true ,     
    `show_text` boolean default true   ,  
    `bloc_column` boolean  default false  ,     
    `image_right` boolean default false  ,     
    `text_button_more` boolean default false   ,        
    `text` text NOT NULL default "",     
    `image_url` varchar(250)  NOT NULL default "",     
    `alt_image` varchar(250)  NOT NULL default "",     
    `css` text NOT NULL default "",     
    `background_color` varchar(250)  NOT NULL default "#fffffff",     
    `bloc_number` int(11)  NOT NULL,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);
/*Table structure for table `video` */

CREATE TABLE IF NOT EXISTS `video` (
    `id` int(11) NOT NULL auto_increment,  
    `title` varchar(250)  NOT NULL default "", 
    `type` varchar(55)  NOT NULL default "video",           
    `overlay` boolean  default false  ,   
    `text` text NOT NULL default "",    
    `width` int(11)  NOT NULL default 100,
    `height` int(11)  NOT NULL default 100, 
    `image_url` text NOT NULL default "", 
    `bloc_number` int(11)  NOT NULL,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);
/*Table structure for table `header` */

CREATE TABLE IF NOT EXISTS `header` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "header",   
    `bloc_number` int(11)  NOT NULL,
    `logo_url` varchar(250)  NOT NULL default "",
    `image_url` varchar(250)  NOT NULL default "",
    `background_color` varchar(50)  NOT NULL default "",
    PRIMARY KEY  (`id`)
);
/* user */
CREATE TABLE IF NOT EXISTS `user` (
    `id` int(11) NOT NULL auto_increment,        
    `email` varchar(250)  NOT NULL default "",
    `password` varchar(250)  NOT NULL default "",       
    `token` text  NOT NULL default "", 
    `connection_attempts` int(11)  NOT NULL default 0,
    PRIMARY KEY  (`id`)
);

CREATE TABLE IF NOT EXISTS `footer` (
    `id` int(11) NOT NULL auto_increment,   
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "footer", 
    `bloc_number` int(11)  NOT NULL , 
    `map_iframe_url` text  NOT NULL default "",
    `background_color` varchar(50)  NOT NULL default "",

    PRIMARY KEY  (`id`)
);
/*Table structure for table `links_network_an_others_footer` */
CREATE TABLE IF NOT EXISTS `links_network_an_others_footer` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "links_network_an_others_footer",    
    `name` varchar(250)  NOT NULL default "",     
    `image_url` varchar(250)  NOT NULL default "",
    `background_url` varchar(250)  NOT NULL default "",
    `bloc_number` int(11)  NOT NULL , 
    `footer_id` int,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`footer_id`) REFERENCES footer(`id`) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS `address` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "address",  
    `address` varchar(250)  NOT NULL default "",
    `town` varchar(250)  NOT NULL default "",
    `footer_id` int,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`footer_id`) REFERENCES footer(`id`) ON DELETE CASCADE

);

/*Table structure for table `link_networks_an_others_header` */

CREATE TABLE IF NOT EXISTS `link_networks_an_others_header` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "link_networks_an_others_header",   
    `bloc_number` int(11)  NOT NULL,
    `name` varchar(250)  NOT NULL default "",     
    `image_url` varchar(250)  NOT NULL default "",
    `background_url` varchar(250)  NOT NULL default "",

    `header_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`header_id`) REFERENCES header(`id`) ON DELETE CASCADE
);

/*Table structure for table `screen` */
CREATE TABLE IF NOT EXISTS `screen` (
    `id` int(11) NOT NULL auto_increment,  
    `title` varchar(250)  NOT NULL default "", 
    `type` varchar(55)  NOT NULL default "screen",           
    `overlay` boolean  default false  ,   
    `text` text NOT NULL default "",    
    `image_url` text NOT NULL default "", 
    `bloc_number` int(11)  NOT NULL,
    `page_id` int(11)  NOT NULL,
    PRIMARY KEY  (`id`),
    FOREIGN KEY (`page_id`) REFERENCES page(`id`) ON DELETE CASCADE
);
/*Table structure for table `common_settings` */
CREATE TABLE IF NOT EXISTS `common` (
    `id` int(11) NOT NULL auto_increment,        
    `title` varchar(250)  NOT NULL default "",
    `type` varchar(55)  NOT NULL default "common",       
    `fond` varchar(11)  NOT NULL default "",     
    `titles` varchar(11)  NOT NULL default "",
    `background_color_buttons` varchar(11)  NOT NULL default "",
    PRIMARY KEY  (`id`)
);
