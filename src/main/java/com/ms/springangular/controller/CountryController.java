package com.ms.springangular.controller;


import com.ms.springangular.controller.util.HeaderUtil;
import com.ms.springangular.controller.util.ResponseUtil;
import com.ms.springangular.core.exception.BadRequestException;
import com.ms.springangular.core.model.Country;
import com.ms.springangular.core.repository.CountryRepository;
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
public class CountryController {

    private static final String ENTITY_NAME = "country";

    @Autowired
    private CountryRepository countryRepository;


    /**
     * POST  /countrys : Create a new country.
     *
     * @param country the country to create
     * @return the ResponseEntity with status 201 (Created) and with body the new country, or with status 400 (Bad Request) if the country has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/countrys")
    public ResponseEntity<Country> createCountry(@Valid @RequestBody Country country) throws BadRequestException, URISyntaxException {
        log.debug("REST request to save Country : {}", country);
        if (country.getCtrId() != null) {
            throw new BadRequestException("A new country cannot already have an ID "+ ENTITY_NAME + "idexists");
        }
        Country result = countryRepository.save(country);
        return ResponseEntity.created(new URI("/api/countrys/" + result.getCtrId()))
                .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getCtrId().toString()))
                .body(result);
    }

    /**
     * PUT  /countrys : Updates an existing country.
     *
     * @param country the country to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated country,
     * or with status 400 (Bad Request) if the country is not valid,
     * or with status 500 (Internal Server Error) if the country couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/countrys")
    public ResponseEntity<Country> updateCountry(@Valid @RequestBody Country country) throws BadRequestException, URISyntaxException {
        log.debug("REST request to update Country : {}", country);
        if (country.getCtrId() == null) {
            throw new BadRequestException("Invalid id "+ ENTITY_NAME+ " id null");
        }
        Country result = countryRepository.save(country);
        return ResponseEntity.ok()
                .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, country.getCtrId().toString()))
                .body(result);
    }

    /**
     * GET  /countrys : get all the countrys.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of countrys in body
     */
    @GetMapping("/countrys")
    public List<Country> getAllCountrys() {
        log.debug("REST request to get all Countrys");
        return countryRepository.findAll();
    }

    /**
     * GET  /countrys/:id : get the "id" country.
     *
     * @param id the id of the country to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the country, or with status 404 (Not Found)
     */
    @GetMapping("/countrys/{id}")
    public ResponseEntity<Country> getCountry(@PathVariable Long id) {
        log.debug("REST request to get Country : {}", id);
        Optional<Country> country = countryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(country);
    }

    /**
     * DELETE  /countrys/:id : delete the "id" country.
     *
     * @param id the id of the country to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/countrys/{id}")
    public ResponseEntity<Void> deleteCountry(@PathVariable Long id) {
        log.debug("REST request to delete Country : {}", id);

        countryRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
