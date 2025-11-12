package uk.techiegt.profa.componenteB.services;

import org.springframework.stereotype.Service;
import uk.techiegt.profa.componenteB.entities.Proveedor;
import uk.techiegt.profa.componenteB.model.ProveedorDto;
import uk.techiegt.profa.componenteB.model.ProveedorInputDto;
import uk.techiegt.profa.componenteB.repositories.ProveedorRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public ProveedorDto crear(ProveedorInputDto input) {
        Proveedor p = new Proveedor();
        p.setNombre(input.getNombre());
        p.setCorreo(input.getCorreo());
        Proveedor guardado = proveedorRepository.save(p);
        return toDto(guardado);
    }

    public List<ProveedorDto> listar() {
        return proveedorRepository.findAll().stream().map(this::toDto).collect(Collectors.toList());
    }

    private ProveedorDto toDto(Proveedor entity) {
        ProveedorDto dto = new ProveedorDto();
        dto.setId(entity.getId() != null ? entity.getId().intValue() : null);
        dto.setNombre(entity.getNombre());
        dto.setCorreo(entity.getCorreo());
        return dto;
    }
}

