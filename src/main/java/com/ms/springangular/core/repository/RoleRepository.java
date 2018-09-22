package com.ms.springangular.core.repository;

import com.ms.springangular.core.model.Role;
import com.ms.springangular.core.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Created by msaddam on 19/08/18.
 */
@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
