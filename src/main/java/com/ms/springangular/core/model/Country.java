package com.ms.springangular.core.model;

import com.ms.springangular.core.model.audit.UserDateAudit;
import lombok.Data;

import javax.persistence.*;


@Data
@Entity
@Table(name = "country")
public class Country extends UserDateAudit {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ctr_id")
    private Long ctrId;

    @Column(name = "ctr_name")
    private String ctrName;

    @Column(name = "ctr_code")
    private String ctrCode;

    @Column(name = "ctr_iso_code_2")
    private String ctrIsoCode2;

    @Column(name = "ctr_iso_code_3")
    private String ctrIsoCode3;

    @Column(name = "ctr_time_zone")
    private String ctrTimeZone;

    @Column(name = "ctr_population")
    private Long ctrPopulation;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="ctr_region")
    private Region ctrRegion;

}
