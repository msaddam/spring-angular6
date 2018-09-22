package com.ms.springangular.core.model;

import com.ms.springangular.core.model.audit.UserDateAudit;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "region")
public class Region extends UserDateAudit {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "RGN_ID")
    private Long rgnId;

    @Column(name = "RGN_NAME")
    private String rgnName;

}
