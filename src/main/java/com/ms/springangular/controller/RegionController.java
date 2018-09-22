package com.ms.springangular.controller;


import com.ms.springangular.controller.util.HeaderUtil;
import com.ms.springangular.controller.util.ResponseUtil;
import com.ms.springangular.core.exception.BadRequestException;
import com.ms.springangular.core.model.Region;
import com.ms.springangular.core.repository.RegionRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("/api")
public class RegionController {

    private static final String ENTITY_NAME = "region";

    @Autowired
    private RegionRepository regionRepository;


    /**
     * POST  /regions : Create a new region.
     *
     * @param region the region to create
     * @return the ResponseEntity with status 201 (Created) and with body the new region, or with status 400 (Bad Request) if the region has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/regions")
    public ResponseEntity<Region> createRegion(@Valid @RequestBody Region region) throws BadRequestException, URISyntaxException {
        log.debug("REST request to save Region : {}", region);
        if (region.getRgnId() != null) {
            throw new BadRequestException("A new region cannot already have an ID "+ ENTITY_NAME + " id exists");
        }
        Region result = regionRepository.save(region);
        return ResponseEntity.created(new URI("/api/regions/" + result.getRgnId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getRgnId().toString()))
                .body(result);
    }

    /**
     * PUT  /regions : Updates an existing region.
     *
     * @param region the region to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated region,
     * or with status 400 (Bad Request) if the region is not valid,
     * or with status 500 (Internal Server Error) if the region couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/regions")
    public ResponseEntity<Region> updateRegion(@Valid @RequestBody Region region) throws BadRequestException, URISyntaxException {
        log.debug("REST request to update Region : {}", region);
        if (region.getRgnId() == null) {
            throw new BadRequestException("Invalid id "+ ENTITY_NAME+ " id null");
        }
        Region result = regionRepository.save(region);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, region.getRgnId().toString()))
                .body(result);
    }

    /**
     * GET  /regions : get all the regions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of regions in body
     */
    @GetMapping("/regions")
    public List<Region> getAllRegions() {
        log.debug("REST request to get all Regions");
        return regionRepository.findAll();
    }

    /**
     * GET  /regions/:id : get the "id" region.
     *
     * @param id the id of the region to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the region, or with status 404 (Not Found)
     */
    @GetMapping("/regions/{id}")
    public ResponseEntity<Region> getRegion(@PathVariable Long id) {
        log.debug("REST request to get Region : {}", id);
        Optional<Region> region = regionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(region);
    }

    /**
     * DELETE  /regions/:id : delete the "id" region.
     *
     * @param id the id of the region to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/regions/{id}")
    public ResponseEntity<Void> deleteRegion(@PathVariable Long id) {
        log.debug("REST request to delete Region : {}", id);

        regionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
